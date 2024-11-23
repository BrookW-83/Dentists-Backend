import { Router } from 'express';
import ImageBlogController  from '../controller/imageBlogsController';
import authMiddleware from "../middleware/authMiddleware";

//image blogs router
const ImageBlogRoute = Router();

ImageBlogRoute.get('/', ImageBlogController.getImageBlogs);
ImageBlogRoute.post('/', authMiddleware(['admin']), ImageBlogController.createImageBlog); 
ImageBlogRoute.get('/:id', ImageBlogController.getImageBlogById);
ImageBlogRoute.patch('/:id', authMiddleware(['admin']), ImageBlogController.updateImageBlog);
ImageBlogRoute.delete('/:id', authMiddleware(['admin']), ImageBlogController.deleteImageBlog);

export default ImageBlogRoute;
