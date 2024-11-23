import { Request,Response } from "express";
import { sql } from "@vercel/postgres";


class scheduleController {
//Get all schedules made
  async getSchedules (req: Request, res: Response) {
    try {
        const schedules = await sql`SELECT * FROM schedule`;
        res.json(schedules.rows)
    } catch (error) {
        console.error('Error getting schedules:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//Get a schedule
  async getSchedule (req: Request, res: Response){
    const {id} = req.params;

    try {
        const schedule = await sql`SELECT * FROM schedule WHERE id = ${id} `;
        res.json(schedule.rows)
    } catch (error) {
        console.error('Error getting schedule:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//Create a schedule
  async createSchedule (req: Request, res: Response) {
  const { firstName, lastName, date, time, email } = req.body;

  try {
    const schedule = await sql`INSERT INTO schedule (first_name, last_name, email, schedule_time, scheduled_date) VALUES(
    ${firstName}, ${lastName}, ${email}, ${time}, ${date})  RETURNING *`;

    res.status(201).json(schedule.rows[0]);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//Update a schedule
  async updateSchedule (req: Request, res: Response) {
  const { id } = req.params;
  const { firstName, lastName, date, time, email } = req.body;

  try {
    const schedules = await sql`
      UPDATE schedule SET fullName = $1, date = $2, time = $3, serviceName = $4, subServiceName = $5, email = $6 WHERE id = $7 RETURNING *',
      (${firstName}, ${lastName}, ${date}, ${time}, ${email}, ${id})`
    
    if (schedules.rows.length === 0) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedules.rows[0]);
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



//Delete a schedule
 async deleteSchedule (req: Request, res: Response) {
  const { id } = req.params;

  try {
    const schedule = await sql`DELETE FROM schedule WHERE id =  ${id}`;
    if (schedule.rows.length === 0) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

}

export default new scheduleController();