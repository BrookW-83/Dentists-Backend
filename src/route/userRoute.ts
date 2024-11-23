import { Router } from 'express';
import userController from '../controller/userController';
import authMiddleware from "../middleware/authMiddleware";

//user router
const userRouter = Router();

userRouter.get('/', authMiddleware(['admin']), userController.getAllUsers);
userRouter.post('/', authMiddleware(['admin']), userController.createUser);
userRouter.get('/:id', authMiddleware(['admin']), userController.getUserById);
userRouter.patch('/:id', authMiddleware(['admin']), userController.updateUser);
userRouter.delete('/:id', authMiddleware(['admin']), userController.deleteUser);

export default userRouter;
