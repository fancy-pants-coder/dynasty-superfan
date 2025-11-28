/**
 * ============================================================================
 * The root module for the NestJS API.
 * ============================================================================
 * This AppModule is the central hub of the application. It's the starting
 * point where all other modules, controllers, and services are registered.
 * By organizing the application into modules, we follow the "Modular Monolith"
 * pattern described in the Technical Design Document, which keeps the codebase
 * clean and scalable.
 *
 * >> Future Work (MVP):
 *    - PrismaModule: To provide a database client to all other services.
 *    - BullModule: To register and configure the Redis-based task queues for
 *      background job processing (e.g., 'league-sync').
 *    - Feature Modules: As the app grows, we will introduce modules like
 *      `UsersModule`, `LeaguesModule`, and `WorkersModule` to encapsulate
 *      domain-specific logic, following NestJS best practices.
 * ============================================================================
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // `imports` will soon include modules for database access, task queues, etc.
  imports: [],

  // The AppController is a placeholder and will likely be removed once
  // domain-specific controllers (e.g., LeaguesController) are created.
  controllers: [AppController],

  // The AppService is also a placeholder and will be replaced by services
  // that handle specific business logic.
  providers: [AppService],
})
export class AppModule {}
