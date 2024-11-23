import { Router } from 'express';
import serviceController from '../controller/servicesController';
import authMiddleware from "../middleware/authMiddleware";

//service router
const serviceRouter = Router();

serviceRouter.get('/', serviceController.getAllService);
serviceRouter.post('/', authMiddleware(['admin']), serviceController.createService); 
serviceRouter.get('/:id', serviceController.getServiceById);
serviceRouter.patch('/:id', authMiddleware(['admin']), serviceController.updateService);
serviceRouter.delete('/:id', authMiddleware(['admin']), serviceController.deleteServices);

export default serviceRouter;

