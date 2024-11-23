import { Router } from 'express';
import subServiceController from '../controller/subServicesController';
import authMiddleware from "../middleware/authMiddleware";

//subservice router
const subServiceRouter = Router();

subServiceRouter.get('/', subServiceController.getAllSubservice);
subServiceRouter.post('/', authMiddleware(['admin']), subServiceController.createSubservices);
subServiceRouter.get('/:id', subServiceController.getSubservicesById);
subServiceRouter.patch('/:id', authMiddleware(['admin']), subServiceController.upSubservicesBlog);
subServiceRouter.delete('/:id', authMiddleware(['admin']), subServiceController.deleteSubservices);

export default subServiceRouter;
