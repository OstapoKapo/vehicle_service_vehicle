import { assertQueue, consumeMessage } from "../services/rabbitmq.service";
import vehicleService from "../services/vehicle.service.js";

export async function startConsumers() {
  await assertQueue('user_created');
  await assertQueue('user_deleted');

  await consumeMessage<string>('user_created', async (msg) => {
    await vehicleService.createVehicle({ userId: msg });
    console.log(`[RABBIT] Vehicle created for user: ${msg}`);
  });

  await consumeMessage<string>('user_deleted', async (msg) => {
    await vehicleService.deleteVehicle(msg);
    console.log(`[RABBIT] Vehicle deleted for user: ${msg}`);
  });

  console.log('🚀 RabbitMQ Consumers initialized and listening...');
}