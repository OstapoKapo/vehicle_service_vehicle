import { Request, Response } from 'express';
import vehicleService from '../services/vehicle.service';
import { Vehicle } from '../common/types/vehicle.type';

export const create = async (req: Request, res: Response<{message: string}>): Promise<Response> => {
    const response = await vehicleService.createVehicle(req.body);
    return res.status(200).json(response);
};

export const getAll = async (req: Request, res: Response<{data: Vehicle[], total: number, totalPages: number}>): Promise<Response> => {
    const page = req.query.page;
    const limit = req.query.limit;
    const response = await vehicleService.getAllVehicles(Number(page), Number(limit));
    return res.status(200).json(response);
}

export const getById = async (req: Request, res: Response<{data: Vehicle | null}>): Promise<Response> => {
    const { id } = req.params;
    const response = await vehicleService.getVehicleById(id);
    return res.status(200).json({data: response});
}

export const update = async (req: Request, res: Response<{message: string}>): Promise<Response> => {
    const { id } = req.params;
    const response = await vehicleService.updateVehicle(id, req.body);
    return res.status(200).json(response);
}

export default {
    create,
    getAll,
    getById,
    update
}