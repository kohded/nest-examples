import { Injectable, Logger } from '@nestjs/common';
import {
  ClientOptions,
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

// Create the microservice options object
const microserviceOptions: ClientOptions = {
  transport: Transport.REDIS,
  options: {
    url: 'redis://localhost:6379',
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
