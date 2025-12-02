import { CreateDto, UpdateDto } from "../common/dto/vehicle.dto";
import { ApiError } from "../common/errors/api.error";
import { Vehicle } from "../common/types/vehicle.type";
import { prisma } from "../lib/prisma";

class VehicleService {
    public async createVehicle(data: CreateDto): Promise<{message: string}> {
        await prisma.vehicle.create({
            data: {
                userId: data.userId,
            }
        });
        return { message: 'Vehicle created successfully' };
    }

    public async getAllVehicles(page: number = 1, limit: number = 10): Promise<{data: Vehicle[], total: number, totalPages: number}> {
        const skip = (page - 1) * limit;

        const [vehicles, total] = await Promise.all([
            prisma.vehicle.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.vehicle.count()
        ]);
        return {data: vehicles, total, totalPages: Math.ceil(total / limit) };
    }

    public async getVehicleById(id: string): Promise<Vehicle | null> {
        const vehicle = await prisma.vehicle.findUnique({
            where: { id }
        });
        if (!vehicle) {
            throw ApiError.NotFound('Vehicle not found');
        }
        return vehicle;
    }

    public async updateVehicle(id: string, data: UpdateDto): Promise<{message: string}> {
        const vehicle = await prisma.vehicle.findUnique({
            where: { id }
        });
        if (!vehicle) {
            throw ApiError.NotFound('Vehicle not found');
        }
        const updatedVehicle = await prisma.vehicle.update({
            where: { id },
            data
        });
        return {message: 'Vehicle updated successfully' };
    }

    public async deleteVehicle(userId: string): Promise<void> {
        await prisma.vehicle.deleteMany({
            where: { userId }
        });
    }

}

export default new VehicleService();