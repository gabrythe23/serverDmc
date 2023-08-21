import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult, HealthCheckService } from '@nestjs/terminus';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { Public } from '@app/authentication';

@Controller('health-check')
@ApiTags('health-check')
@Public()
@ApiExcludeController()
export class HealthCheckController {
  constructor(private readonly health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }

  @Get('health-check')
  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }
}
