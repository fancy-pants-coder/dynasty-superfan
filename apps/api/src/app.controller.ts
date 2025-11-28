/**
 * ============================================================================
 * Placeholder Controller (Scaffolding)
 * ============================================================================
 * This controller serves as a basic entry point to confirm the API is running.
 * It's part of the default NestJS starter template.
 *
 * >> Future Work (MVP):
 *    - This controller will be removed.
 *    - It will be replaced by domain-specific controllers such as
 *      `LeaguesController` (for fetching league data), `UsersController` (for
 *      managing user profiles and subscriptions), and `AuthController` (for
 *      handling user login). Each controller will have clearly defined
 *      endpoints corresponding to features in the application.
 * ============================================================================
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * A simple health-check endpoint. If you see "Hello World!", the API is up.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
