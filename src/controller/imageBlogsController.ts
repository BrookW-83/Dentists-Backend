import { Request, Response } from "express";
import { sql } from "@vercel/postgres";

class ImageBlogController {
  async getImageBlogs(req: Request, res: Response) {
    try {
      const blogs = await sql`SELECT * FROM imagess`;
      return res.status(200).json(blogs);
      
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async getImageBlogById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const imageBLog = await sql`SELECT * FROM images WHERE id = ${id}`;
      return res.status(200).json(imageBLog);
    } catch (error) {
      console.error(error);
      return res.status(404).send("Image Blog not found");
    }
  }

  async createImageBlog(req: Request, res: Response) {
    const { title, note, images } = req.body;

    try {
      await sql`INSERT INTO images (title, note, images) VALUES (${title}, ${note}, ${images}) RETURNING *`;
      return res.status(201).send("Image Blog created succesfully");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async updateImageBlog(req: Request, res: Response) {
    const { id } = req.params;
    const { title, note, images } = req.body;
    try {
      await sql`UPDATE imagess SET title = $1, note = $2, images = $3 WHERE id = $4 RETURNING *, (${title}, ${note}, ${images}, ${id})`;
      return res.status(200).send("Image Blog update successfully");
    } catch (error) {
      console.error(error);
      return res.status(404).send("Image Blog not found");
    }
  }

  async deleteImageBlog(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await sql`DELETE FROM images WHERE id = ${id}`;
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(404).send("Image Blog not found");
    }
  }
}

export default new ImageBlogController();
