import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const start = Date.now();

    this.logger.log(`→ [${method}] ${originalUrl} | IP: ${ip}`);

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start;
      const statusLabel =
        statusCode >= 500
          ? '❌ ERROR'
          : statusCode >= 400
            ? '⚠️  WARNING'
            : '✓ OK';

      this.logger.log(
        `← [${statusCode}] ${method} ${originalUrl} | ${duration}ms ${statusLabel}`,
      );
    });

    res.on('close', () => {
      if (!res.writableEnded) {
        const duration = Date.now() - start;
        this.logger.error(
          `✗ [CLOSED] ${method} ${originalUrl} | ${duration}ms`,
        );
      }
    });

    next();
  }
}
