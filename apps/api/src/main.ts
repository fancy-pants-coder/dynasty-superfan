/**
 * ============================================================================
 * The main entry point for the NestJS backend API.
 * ============================================================================
 * This file is responsible for bootstrapping the NestJS application, which is
 * the central orchestrator for handling incoming HTTP requests, managing
 * database interactions, and dispatching jobs to the background worker service.
 *
 * >> Future Work (MVP):
 *    - Global Middleware: CORS for the Next.js frontend, Helmet for security
 *      headers, and a global exception filter for standardized error responses.
 *    - Configuration Service: Centralized management of environment variables
 *      (e.g., database URLs, API keys) using NestJS's ConfigModule.
 *    - API Versioning: Implementing a '/v1' prefix for all endpoints to
 *      future-proof the API.
 *    - Graceful Shutdown: Ensuring the application properly closes database
 *      connections and worker queues on termination.
 * ============================================================================
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // The port is sourced from the environment variable `PORT` (e.g., provided
  // by a hosting platform like Railway or Heroku), with a default of 3001 for
  // local development.
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
