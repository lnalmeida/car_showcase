"use server";

import { db } from "@/lib/prisma";
import { z } from "zod";
import { logEvent } from "@/lib/logger";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const leadSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  phone: z.string().min(8, "Telefone é obrigatório"),
  email: z.string().email("E-mail inválido"),
  message: z.string().min(5, "Mensagem muito curta"),
  vehicleId: z.string().uuid("ID do veículo inválido"),
});

/**
 * Dispatches the lead to external providers if configured.
 * This is designed to be easily extensible.
 */
async function dispatchLead(lead, settings) {
  if (settings.leadIntegration === "NONE") return;

  try {
    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        name: lead.name,
        email: lead.email,
        personal_phone: lead.phone,
        cf_mensagem: lead.message,
        cf_veiculo_id: lead.vehicleId,
        cf_lead_status: lead.status,
        conversion_identifier: "interesse-veiculo",
      },
    };

    if (settings.leadIntegration === "RDSTATION" && settings.leadApiKey) {
      console.log("Dispatching to RD Station:", settings.leadApiKey, payload);
      // Actual integration would go here
    } else if (settings.leadIntegration === "WEBHOOK" && settings.leadWebhookUrl) {
      console.log("Dispatching to Webhook:", settings.leadWebhookUrl, payload);
      
      await fetch(settings.leadWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
  } catch (error) {
    console.error("Failed to dispatch lead to external provider:", error);
  }
}

export async function createLead(formData) {
  try {
    const rawData = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
      vehicleId: formData.get("vehicleId"),
    };

    const validatedData = leadSchema.parse(rawData);

    // 1. Save to database - using lowercase 'lead' as per Prisma convention
    const lead = await db.lead.create({
      data: {
        ...validatedData,
        status: "NEW",
      },
    });

    // 2. Fetch dealership settings for integration
    const settings = await db.dealershipInfo.findFirst();

    // 3. Dispatch to external tools if configured
    if (settings) {
      await dispatchLead(lead, settings);
    }

    // 4. Log event
    const { userId } = await auth();
    logEvent("lead_capture", {
      lead_id: lead.id,
      vehicle_id: lead.vehicleId,
      integration: settings?.leadIntegration || "NONE"
    }, { clerkUserId: userId || "anonymous" });

    revalidatePath(`/vehicles/${lead.vehicleId}`);
    revalidatePath("/admin/leads");

    return { success: true };
  } catch (error) {
    console.error("Error creating lead:", error);
    return { 
      success: false, 
      error: "Ocorreu um erro ao enviar seu interesse. Tente novamente mais tarde." 
    };
  }
}

export async function getLeads(params = {}) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

    const { status, search, page = 0, limit = 20 } = params;

    let where = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    const [leads, totalCount] = await Promise.all([
      db.lead.findMany({
        where,
        include: { vehicle: true },
        orderBy: { createdAt: "desc" },
        skip: page * limit,
        take: limit,
      }),
      db.lead.count({ where }),
    ]);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(leads)),
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching leads:", error);
    return { success: false, error: error.message };
  }
}

export async function getLead(id) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

    const lead = await db.lead.findUnique({
      where: { id },
      include: { vehicle: true },
    });

    if (!lead) throw new Error("Lead not found");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(lead)),
    };
  } catch (error) {
    console.error("Error fetching lead:", error);
    return { success: false, error: error.message };
  }
}

export async function updateLeadStatus(id, status) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

    const lead = await db.lead.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/leads");
    revalidatePath(`/admin/leads/${id}`);

    logEvent("lead_status_update", { lead_id: id, status }, user);

    return { success: true };
  } catch (error) {
    console.error("Error updating lead status:", error);
    return { success: false, error: error.message };
  }
}
