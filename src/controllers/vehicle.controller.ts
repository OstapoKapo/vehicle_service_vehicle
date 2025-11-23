import { Request, Response } from 'express';
import vehicleService from '../services/vehicle.service';

export const create = async (req: Request, res: Response): Promise<Response> => {
    const response = await vehicleService.createVehicle(req.body);
    return res.status(200).json(response);
};

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    const response = await vehicleService.getAllVehicles();
    return res.status(200).json(response);
}

export default {
    create,
    getAll
}