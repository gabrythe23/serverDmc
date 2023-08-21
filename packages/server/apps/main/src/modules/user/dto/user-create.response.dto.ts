import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserCreateResponseDto {
  @ApiProperty({ type: String })
  @Expose()
  id: string;
}
