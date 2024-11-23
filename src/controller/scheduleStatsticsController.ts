import { Request, Response } from "express";
import { sql } from "@vercel/postgres";


class ScheduleStatstics {
    async getDailyScheduleStatstics(req: Request, res: Response) {
        try {
            const dailyQuery = await sql`SELECT COUNT(*) FROM schedules WHERE date = CURRENT_DATE`;
            const dailyCount = dailyQuery.rows[0];
            return res.status(200).json(dailyCount);

        } catch (error) {

            return res.status(500).send("Internal Server Error");
        }
    }

    async getWeeklyScheduleStatstics(req: Request, res: Response) {
        try {
            const weeklyQuery = await sql`SELECT COUNT(*) FROM schedules WHERE date BETWEEN CURRENT_DATE - INTERVAL '7 days' AND CURRENT_DATE`;
            const weeklyCount = weeklyQuery.rows[0];
            return res.status(200).json(weeklyCount);

        } catch (error) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getMonthlyScheduleStatstics(req: Request, res: Response) {
        try {
            const monthlyQuery = await sql`SELECT COUNT(*) FROM schedules WHERE date BETWEEN CURRENT_DATE - INTERVAL '30 days' AND CURRENT_DATE`;
            const monthlyCount = monthlyQuery.rows[0];
            return res.status(200).json(monthlyCount);

        } catch (error) {
            return res.status(500).send("Internal Server Error");
            
        }
    }
}

export default new ScheduleStatstics();