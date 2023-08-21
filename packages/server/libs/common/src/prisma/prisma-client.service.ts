import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaClientService.name);

  async onModuleInit(): Promise<void> {
    this.logger.log('Connecting to database');
    await this.$connect();
    // Add soft delete middleware
    this.$use(this.middlewareSoftDelete);
  }

  enableShutdownHooks(app: INestApplication): void {
    this.logger.log('Enabling shutdown hooks');
    this.$on('beforeExit', (): void => {
      this.logger.log('Disconnecting from database');
      app
        .close()
        .catch((err: Error) => this.logger.error(`Error closing app: ${err.message || ''}`));
    });
  }

  private readonly middlewareSoftDelete: Prisma.Middleware = async (params, next) => {
    // Check incoming query type
    if (params.action == 'delete') {
      // Delete queries
      // Change action to an update
      params.action = 'update';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args['data'] = { deleted: true };
    }
    if (params.action == 'deleteMany') {
      // Delete many queries
      params.action = 'updateMany';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (params.args.data != undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        params.args.data['deleted'] = true;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        params.args['data'] = { deleted: true };
      }
    }
    return next(params);
  };
}
