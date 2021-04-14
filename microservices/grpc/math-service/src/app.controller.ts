import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices'; //     <-- to this
import { MathService } from './math.service';

interface INumberArray {
  data: number[];
}
interface ISumOfNumberArray {
  sum: number;
}

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(private mathService: MathService) {}

  // If class AppController===AppController and func accumulate===Accumulate, you dont need to pass into @GrpcMethod()
  @GrpcMethod('AppController', 'Accumulate')
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray {
    this.logger.log('Adding ' + numberArray.data.toString());
    return { sum: this.mathService.accumulate(numberArray.data) };
  }
}
