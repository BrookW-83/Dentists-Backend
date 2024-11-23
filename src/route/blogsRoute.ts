import express from "express";
import blogsController from "../controller/blogsController";
import authMiddleware from "../middleware/authMiddleware";

//blogs router
const blogRouter = express.Router();

blogRouter.get("/", blogsController.getAllBlogs);
blogRouter.get("/:id", blogsController.getBlogById);
blogRouter.post("/", authMiddleware(['admin']), blogsController.createBlog);
blogRouter.put("/:id", authMiddleware(['admin']),  blogsController.updateBlog);
blogRouter.delete("/:id",authMiddleware(['admin']), blogsController.deleteBlog);

export default blogRouter;