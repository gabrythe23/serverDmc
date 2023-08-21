import { PrismaClientService } from '.';
import { INestApplication } from '@nestjs/common';

describe('PrismaClientService', () => {
  let service: PrismaClientService;
  let app: { close: jest.Mock };

  beforeEach(async () => {
    service = new PrismaClientService();
    app = { close: jest.fn() };
  });

  afterEach(async () => {
    await service.$disconnect();
  });

  it('should connect to the database on module initialization', async () => {
    service.$connect = jest.fn();

    await service.onModuleInit();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.$connect).toHaveBeenCalled();
  });

  it('should enable shutdown hooks on the app', async () => {
    service.$on = jest.fn();

    service.enableShutdownHooks(app as unknown as INestApplication);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.$on).toHaveBeenCalledWith('beforeExit', expect.any(Function));
  });
});
