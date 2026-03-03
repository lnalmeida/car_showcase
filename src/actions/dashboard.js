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

    const testDriveCounts = await db.visitBooking.groupBy({
      by: ["status"],
      _count: { status: true },
    });
    const totalTestDrives = testDriveCounts.reduce(
      (acc, curr) => acc + curr._count.status,
      0
    );
    // ... (other test drive stats can be calculated here if needed)

    // --- Sales Trend Data (Period-dependent) ---
    const salesData = await db.vehicle.findMany({
      where: {
        status: "Vendido",
        updatedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "asc",
      },
    });

    let salesTrend;
    if (period === "yearly") {
      const salesByMonth = salesData.reduce((acc, sale) => {
        const month = format(sale.updatedAt, "yyyy-MM");
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      salesTrend = eachMonthOfInterval({ start: startDate, end: endDate }).map(
        (month) => {
          const monthKey = format(month, "yyyy-MM");
          return {
            date: format(month, "MMM", { locale: ptBR }),
            sales: salesByMonth[monthKey] || 0,
          };
        }
      );
    } else {
      const salesByDay = salesData.reduce((acc, sale) => {
        const day = format(sale.updatedAt, "yyyy-MM-dd");
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});

      salesTrend = eachDayOfInterval({ start: startDate, end: endDate }).map(
        (day) => {
          const dayKey = format(day, "yyyy-MM-dd");
          return {
            date: dayKey,
            sales: salesByDay[dayKey] || 0,
          };
        }
      );
    }

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
    };

    return {
      success: true,
      data: {
        cars: {
          total: totalVehicles,
          available: availableVehicles,
          sold: soldVehicles,
        },
        testDrives,
        salesTrend,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { success: false, error: "Failed to load dashboard data" };
  }
};
