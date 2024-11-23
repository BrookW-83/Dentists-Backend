import { Request, Response } from "express";
import { sql } from "@vercel/postgres";

class SubServiceController {
  async getAllSubservice(req: Request, res: Response) {
    try {
      const subservices = await sql`SELECT * FROM subservices`;
      return res.status(200).json(subservices);
      
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async getSubservicesById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const subservice = await sql`SELECT * FROM subservices WHERE id = ${id}`;
      return res.status(200).json(subservice);
    } catch (error) {
      console.error(error);
      return res.status(404).send("Subservice not found");
    }
  }

  async createSubservices(req: Request, res: Response) {
    const { name, discription } = req.body;

    try {
      await sql`INSERT INTO subservices (name, description) VALUES (${name}, ${discription}) RETURNING *`;
      return res.status(201).send("Subservices created succesfully");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async upSubservicesBlog(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      await sql`UPDATE subservices SET name = $1, description = $2 WHERE id = $3 RETURNING *, (${name}, ${description}, ${id})`;
      return res.status(200).send("Subservices update successfully");
    } catch (error) {
      console.error(error);
      return res.status(404).send("Subservices not found");
    }
  }

  async deleteSubservices(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await sql`DELETE FROM subservices WHERE id = ${id}`;
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(404).send("Subservices not found");
    }
  }
}

export default new SubServiceController();
