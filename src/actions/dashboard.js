"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  subDays,
  subMonths,
  format,
  startOfMonth,
  eachDayOfInterval,
  eachMonthOfInterval,
} from "date-fns";
import { ptBR } from "date-fns/locale";

export const getDashboardStats = async (period = "monthly") => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user || user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    // --- Dynamic Date Range ---
    let startDate;
    const endDate = new Date();
    switch (period) {
      case "weekly":
        startDate = subDays(endDate, 6);
        break;
      case "yearly":
        startDate = subMonths(endDate, 11);
        break;
      case "monthly":
      default:
        startDate = subDays(endDate, 29);
        break;
    }

    // --- General Stats (not period-dependent for now) ---
    const vehicleCounts = await db.vehicle.groupBy({
      by: ["status"],
      _count: { status: true },
    });
    const totalVehicles = vehicleCounts.reduce(
      (acc, curr) => acc + curr._count.status,
      0
    );
    const availableVehicles =
      vehicleCounts.find((v) => v.status === "Disponível")?._count.status || 0;
    const soldVehicles =
      vehicleCounts.find((v) => v.status === "Vendido")?._count.status || 0;

    // --- Test Drives Stats ---
    const testDriveCounts = await db.visitBooking.groupBy({
      by: ["status"],
      _count: { status: true },
    });
    const totalTestDrives = testDriveCounts.reduce(
      (acc, curr) => acc + curr._count.status,
      0
    );

    // Buscar agendamentos recentes (Hoje e amanhã) para o widget do Dashboard
    const recentBookings = await db.visitBooking.findMany({
      where: {
        status: { in: ['PENDING', 'CONFIRMED'] },
        visitDate: {
          gte: startOfMonth(new Date()), // Busca do inicio do mes para ter volume no dashboard inicial
        }
      },
      include: {
        Vehicle: {
          include: { brand: true }
        },
        user: true
      },
      orderBy: { visitDate: 'asc' },
      take: 5
    });

    // --- Sales By Category Data (Period-dependent) ---
    const salesData = await db.sale.findMany({
      where: {
        saleDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        vehicle: {
          include: {
            category: true,
          },
        },
      },
    });

    const salesByCategoryMap = salesData.reduce((acc, sale) => {
      const categoryName = sale.vehicle?.category?.name || "Outros";
      acc[categoryName] = (acc[categoryName] || 0) + 1; // Contagem por volume de unidades vendidas
      return acc;
    }, {});

    const salesByCategory = Object.entries(salesByCategoryMap).map(([name, value]) => ({
      name,
      value
    }));

    // --- Final Data Structure ---
    const testDrives = {
      total: totalTestDrives,
      pending:
        testDriveCounts.find((t) => t.status === "PENDING")?._count.status || 0,
      confirmed:
        testDriveCounts.find((t) => t.status === "CONFIRMED")?._count.status ||
        0,
      completed:
        testDriveCounts.find((t) => t.status === "COMPLETED")?._count.status ||
        0,
      cancelled:
        testDriveCounts.find((t) => t.status === "CANCELLED")?._count.status ||
        0,
      noShow:
        testDriveCounts.find((t) => t.status === "NO_SHOW")?._count.status || 0,
      conversionRate:
        totalTestDrives > 0
          ? parseFloat(((soldVehicles / totalTestDrives) * 100).toFixed(1))
          : 0,
      recentBookings: recentBookings.map(b => ({
        ...b,
        visitDate: b.visitDate.toISOString()
      }))
    };

    const payload = {
      cars: {
        total: totalVehicles,
        available: availableVehicles,
        sold: soldVehicles,
      },
      testDrives,
      salesByCategory,
    };

    return {
      success: true,
      data: JSON.parse(JSON.stringify(payload)),
    };
  } catch (error) {
    console.error("Erro ao carregar dados do dashboard");
    return { success: false, error: "Failed to load dashboard data" };
  }
};
