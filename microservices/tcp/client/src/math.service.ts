import { Injectable, Logger } from '@nestjs/common';
import {
  ClientOptions,
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

// Create the microservice options object
const microserviceOptions: ClientOptions = {
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 8877,
  },
};

@Injectable()
export class MathService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create(microserviceOptions);
  }

  public accumulate(data: number[]) {
    return this.client.send<number, number[]>('add', data);
  }
}
