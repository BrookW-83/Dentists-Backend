import { Request, Response } from "express";
import { sql } from "@vercel/postgres";

class ServiceController {
  async getAllService(req: Request, res: Response) {
    try {
      const service = await sql`SELECT * FROM services`;
      return res.status(200).json(service);
      
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async getServiceById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const blog = await sql`SELECT * FROM blogs WHERE id = ${id}`;
      return res.status(200).json(blog);
    } catch (error) {
      console.error(error);
      return res.status(404).send("Service not found");
    }
  }

  async createService(req: Request, res: Response) {
    const { name, description, image } = req.body;

    try {
      await sql`INSERT INTO services (name, description, image) VALUES (${name}, ${description}, ${image}) RETURNING *`;
      return res.status(201).send("Service created succesfully");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async updateService(req: Request, res: Response) {
    const { id } = req.params;
    const { newName, newDescription, newImage } = req.body;
    try {
      await sql`UPDATE services SET name = $1, description = $2, image = $3 WHERE id = $4 RETURNING *, (${newName}, ${newDescription}, ${newImage}, ${id})`;
      return res.status(200).send("Service update successfully");
    } catch (error) {
      console.error(error);
      return res.status(404).send("Service not found");
    }
  }

  async deleteServices(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await sql`DELETE FROM services WHERE id = ${id}`;
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(404).send("Service not found");
    }
  }
}

export default new ServiceController();
