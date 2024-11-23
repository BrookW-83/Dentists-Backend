import { Router } from 'express';
import ScheduleStatstics from '../controller/scheduleStatsticsController';
import authMiddleware from "../middleware/authMiddleware";

//schedule statstics router
const scheduleStatsticeRouter = Router();

scheduleStatsticeRouter.get('/', authMiddleware(['admin', 'doctor']), ScheduleStatstics.getDailyScheduleStatstics);
scheduleStatsticeRouter.post('/', authMiddleware(['admin', 'doctor']),  ScheduleStatstics.getWeeklyScheduleStatstics); 
scheduleStatsticeRouter.get('/', authMiddleware(['admin', 'doctor']), ScheduleStatstics.getMonthlyScheduleStatstics);


export default scheduleStatsticeRouter;
