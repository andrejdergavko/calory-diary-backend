import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok1',
      timestamp: new Date().toISOString(),
    };
  }
}
