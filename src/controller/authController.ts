import { Request, Response } from "express";
import { sql } from "@vercel/postgres";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

class authController {

//user registration
  async register(req: Request, res: Response) {
    const { email, fullName, phoneNumber, profileImage, password, role, bio } = req.body;

    try {
      const hashedPassword = await hash(password, 10);
      await sql`INSERT INTO admin (email, full_name, phone_number, profile_image, password, role, bio) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *,
            ${email}, ${fullName}, ${phoneNumber}, ${profileImage}, ${hashedPassword}, ${role}, ${bio}`;

      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

//user login
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await sql` SELECT * FROM admin WHERE email = ${email}`;
      if (user.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const isPasswordValid = await compare(password, user.rows[0].password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.rows[0].id, email: user.rows[0].email, role: user.rows[0].role },
        process.env.JWT_SECRET as string,
        { expiresIn: "2h" }
      );

      return res.json({ token});
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new authController();
