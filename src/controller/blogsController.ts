import { Request, Response } from "express";
import { sql } from "@vercel/postgres";

class BlogController {
  async getAllBlogs(req: Request, res: Response) {
    try {
      const blogs = await sql`SELECT * FROM blogs`;
      return res.status(200).json(blogs);
      
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async getBlogById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const blog = await sql`SELECT * FROM blogs WHERE id = ${id}`;
      return res.status(200).json(blog);
    } catch (error) {
      console.error(error);
      return res.status(404).send("Blog not found");
    }
  }

  async createBlog(req: Request, res: Response) {
    const { title, description, detail, author } = req.body;

    const date = new Date().toISOString();

    try {
      await sql`INSERT INTO blogs (title, description, detail, author, date) VALUES (${title}, ${description}, ${detail}, ${author}, ${date}) RETURNING *`;
      return res.status(201).send("Blog created succesfully");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async updateBlog(req: Request, res: Response) {
    const { id } = req.params;
    const { title, detail, description } = req.body;
    try {
      await sql`UPDATE blogs SET title = $1, content = $2 WHERE id = $3 RETURNING *, (${title}, ${detail}, ${description}, ${id})`;
      return res.status(200).send("Blog update successfully");
    } catch (error) {
      console.error(error);
      return res.status(404).send("Blog not found");
    }
  }

  async deleteBlog(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await sql`DELETE FROM blogs WHERE id = ${id}`;
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(404).send("Blog not found");
    }
  }
}

export default new BlogController();
