import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaClientModule } from '@app/common';
import { AdminUserController } from './admin-user.controller';

@Module({
  imports: [PrismaClientModule],
  controllers: [UserController, AdminUserController],
  providers: [UserService],
})
export class UserModule {}
