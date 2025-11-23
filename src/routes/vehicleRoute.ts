import express from 'express';
import { validateDto } from '../common/middleware/validation.middleware';
import { CreateDto } from '../common/dto/vehicle.dto';
import vehicleController from '../controllers/vehicle.controller';
const router = express.Router();

router.post('/', validateDto(CreateDto), vehicleController.create);

router.get('/get', vehicleController.getAll);

export default router;