import { Request, Response } from "express";
import { sql } from "@vercel/postgres";

class userController {
    async getAllUsers(req: Request, res: Response) {
        try {
        const users = await sql`SELECT * FROM users`;
        return res.status(200).json(users);
        
        } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
        }
    }
    
    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
    
        try {
        const user = await sql`SELECT * FROM users WHERE id = ${id}`;
        return res.status(200).json(user);
        } catch (error) {
        console.error(error);
        return res.status(404).send("User not found");
        }
    }
    
    async createUser(req: Request, res: Response) {
        const { name, email } = req.body;
    
        try {
        await sql`INSERT INTO users (name, email) VALUES (${name}, ${email}) RETURNING *`;
        return res.status(201).send("User created succesfully");
        } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
        }
    }
    
    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email } = req.body;
        try {
        await sql`UPDATE users SET name = $1, email = $2, WHERE id = $4 RETURNING *, (${name}, ${email}, ${id})`;
        return res.status(200).send("User update successfully");
        } catch (error) {
        console.error(error);
        return res.status(404).send("User not found");
        }
    }
    
    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
        await sql`DELETE FROM users WHERE id = ${id}`;
        return res.status(204).end();
        } catch (error) {
        console.error(error);
        return res.status(404).send("User not found");
        }
    }
}

export default new userController();