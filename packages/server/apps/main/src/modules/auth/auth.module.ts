import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClientModule } from '@app/common';
import { JwtStrategyModule } from '@app/authentication';

@Module({
  imports: [PrismaClientModule, JwtStrategyModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
