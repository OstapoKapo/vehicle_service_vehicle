import { CreateDto } from "../common/dto/vehicle.dto";
import { prisma } from "../lib/prisma";

class VehicleService {
    public async createVehicle(data: CreateDto) {
        await prisma.vehicle.create({
            data: {
                userId: data.userId,
            }
        });
        return { message: 'Vehicle created successfully' };
    }

    public async getAllVehicles() {
        const vehicles = await prisma.vehicle.findMany();
        return vehicles;
    }
}

export default new VehicleService();