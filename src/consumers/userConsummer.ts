import { initRabbit, assertQueue, consumeMessage } from '../services/rabbitmq.service';
import vehicleService from '../services/vehicle.service';

(async () => {
  await initRabbit();

  await assertQueue('user_created');

  await consumeMessage<string>('user_created', async (msg) => {
    await vehicleService.createVehicle({ userId: msg });
  });

  console.log('🚀 Consumer is listening...');
})();
