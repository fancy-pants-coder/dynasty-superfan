/**
 * ============================================================================
 * Placeholder Service (Scaffolding)
 * ============================================================================
 * This service provides the logic for the placeholder AppController.
 * It's part of the default NestJS starter template and has no real function
 * beyond demonstrating the dependency injection system.
 *
 * >> Future Work (MVP):
 *    - This service will be removed.
 *    - It will be replaced by domain-specific services like `LeaguesService`
 *      (to handle league data fetching and synchronization logic),
 *      `UsersService` (for user account management), and `AnalyticsService`
 *      (for calculating power rankings and dynasty values). These services
 *      will contain the core business logic of the application.
 * ============================================================================
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Returns a static string.
   */
  getHello(): string {
    return 'Hello World!';
  }
}
