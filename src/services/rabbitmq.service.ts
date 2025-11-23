import * as amqp from 'amqplib';

const rmqhost = process.env.RABBITMQ_HOST || 'localhost';
const rmqUser = process.env.RABBITMQ_USER || 'guest';
const rmqPass = process.env.RABBITMQ_PASS || 'guest';

class RabbitMQConnection {
  connection: any;        
  channel!: amqp.Channel;
  private connected = false;

  async connect() {
    if (this.connected && this.channel) return;
    this.connected = true;

    try {
      console.log(`⌛️ Connecting to RabbitMQ Server`);
      this.connection = await amqp.connect(
        process.env.RABBITMQ_URL || `amqp://${rmqUser}:${rmqPass}@${rmqhost}`
      );
      this.channel = await this.connection.createChannel();
      console.log(`✅ RabbitMQ connected and channel created`);
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
    }
  }

  async assertQueue(queue: string) {
    if (!this.channel) await this.connect();
    await this.channel.assertQueue(queue, { durable: true });
  }

  async sendToQueue(queue: string, message: any) {
    if (!this.channel) await this.connect();
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  }

  async consume(queue: string, handler: (msg: any) => void) {
    if (!this.channel) await this.connect();
    await this.channel.consume(queue, (msg) => {
      if (!msg) return;
      const content = JSON.parse(msg.content.toString());
      handler(content);
      this.channel.ack(msg);
    });
  }
}

const mqConnection = new RabbitMQConnection();

export default mqConnection;

export async function initRabbit() {
  await mqConnection.connect();
}

export async function assertQueue(queue: string) {
  await mqConnection.assertQueue(queue);
}

export async function sendMessage(queue: string, message: any) {
  await mqConnection.sendToQueue(queue, message);
}

export async function consumeMessage<T>(queue: string, handler: (msg: T) => void) {
  await mqConnection.consume(queue, (rawMsg: any) => {
    const str = rawMsg.toString();
    let parsed: any;
    try {
      parsed = JSON.parse(str);
    } catch {
      parsed = str;
    }
    handler(parsed as T);
  });
}
