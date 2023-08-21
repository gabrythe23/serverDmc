import { Module } from '@nestjs/common';
import { PrismaClientService } from './prisma-client.service';

@Module({
  providers: [PrismaClientService],
  exports: [PrismaClientService],
  imports: [],
})
export class PrismaClientModule {}
