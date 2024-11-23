import { Request, Response, NextFunction } from 'express';
import { sql } from "@vercel/postgres";

export const validateSchedule = async (req: Request, res: Response, next: NextFunction) => {
  const { date, time, email } = req.body;


  try {
    //Check for date and time conflict
    const timeConflictCheck = await sql` SELECT * FROM schedules WHERE date = $1 AND time = $2, ${date}, ${time}`;
    if (timeConflictCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Time slot already taken. Please choose another time.' });
    }

    // Check that the user doesn't already have an appointment on the same day
    const userAppointmentCheck = await sql`SELECT * FROM schedules WHERE date = $1 AND email = $2, ${date}, ${email}`
    if (userAppointmentCheck.rows.length > 0) {
      return res.status(429).json({ message: 'You already have an appointment on this day. Please choose another day.' });
    }

    next();
  } catch (error) {
    console.error('Error validating schedule:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
