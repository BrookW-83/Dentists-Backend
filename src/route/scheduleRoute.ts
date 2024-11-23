import { Router } from 'express';
import scheduleController from '../controller/scheduleController';
import { validateSchedule } from '../middleware/validateSchedule';

//create schedule router
const scheduleRouter = Router();

scheduleRouter.get('/', scheduleController.getSchedules);
scheduleRouter.post('/', validateSchedule, scheduleController.createSchedule); 
scheduleRouter.get('/:id', scheduleController.getSchedule);
scheduleRouter.patch('/:id', validateSchedule, scheduleController.updateSchedule);
scheduleRouter.delete('/:id', scheduleController.deleteSchedule);

export default scheduleRouter;
