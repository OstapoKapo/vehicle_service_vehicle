import express from 'express';
import { validateDto } from '../common/middleware/validation.middleware';
import { CreateDto, UpdateDto } from '../common/dto/vehicle.dto';
import vehicleController from '../controllers/vehicle.controller';
import { authMiddleware } from '../common/middleware/auth.middleware';
const router = express.Router();

router.post('/', authMiddleware,  validateDto(CreateDto), vehicleController.create);

router.get('/', vehicleController.getAll);

router.get('/:id', vehicleController.getById);

router.put('/:id', authMiddleware, validateDto(UpdateDto), vehicleController.update);



export default router;