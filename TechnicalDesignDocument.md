Technical Design Document: Sleeper Fantasy Superfan App
1. High-Level Architecture
Pattern: Modular Monolith with Asynchronous Worker Queues.
The system is designed to be Database-First. The Frontend never speaks to Sleeper directly. The Backend acts as a synchronization engine that pulls data, normalizes it, enriches it with analytics, and serves it to the user. This ensures the app remains responsive even during Sleeper API outages or high-traffic Sundays.
System Diagram
graph TD
    User[User Mobile/Web] -->|HTTPS| FE[Next.js Frontend]
    FE -->|REST API| API[Node.js Backend API]
    
    subgraph "Backend Services"
        API -->|Read/Write| DB[(Postgres Database)]
        API -->|Dispatch Jobs| Queue[Redis Task Queue]
        
        Worker[Background Worker Service] -->|Pop Jobs| Queue
        Worker -->|Fetch Data| SleeperAPI[Sleeper External API]
        Worker -->|Write Raw & Derived Data| DB
    end

    subgraph "Domain Logic"
        Engine[Analytics Engine]
        Engine -->|Calculate| TradeCalc[Trade Calculator]
        Engine -->|Calculate| PowerRank[Power Rankings]
        Engine -->|Calculate| DynastyVal[Proprietary Value Engine]
    end
    
    Worker --> Engine


2. Technology Stack Selection
Component
Choice
Rationale
Frontend
Next.js (React) + Tailwind CSS
Server-side rendering (SSR) is crucial for sharing "League Report Cards" on social media. Tailwind ensures rapid mobile-first development.
Backend
Node.js (NestJS)
TypeScript is mandatory to share types (Interfaces) between Frontend and Backend. NestJS provides a rigid structure that forces the "Modular" approach, preventing spaghetti code.
Database
PostgreSQL
We need relational integrity for Leagues/Teams, but JSONB columns to store raw Sleeper responses (for debugging and caching).
ORM
Prisma
Excellent TypeScript integration, type-safety, and migration management.
Queue
BullMQ (on Redis)
Handles the heavy lifting (importing 5 years of league history) without blocking the UI.
Infrastructure
Vercel (FE) + Railway (BE/DB)
Fast MVP deployment pipelines with built-in CI/CD.

3. Database Schema Design
This is the backbone of the application. We distinguish between Source Data (mirrored from Sleeper) and Derived Data (our value-add).
A. Core Entity Tables (Source Data)
users
id (UUID)
sleeper_username (String, Indexed)
email (String) — For subscription management
subscription_tier (Enum: SUBSCRIBED, NOT_SUBSCRIBED)
leagues
id (UUID)
external_id (Sleeper League ID)
status (active, archived)
settings (JSONB) — Stores roster spots, scoring settings (PPR/TE Premium)
season (String) — e.g., "2024"
last_full_sync_at (Timestamp)
last_roster_sync_at (Timestamp)
teams (Represents a user's entry in a specific league)
id (UUID)
league_id (FK)
owner_id (FK -> users)
roster_settings (JSONB)
metadata (JSONB) — Team name, avatarURL
players (Global Player Database)
id (UUID)
sleeper_player_id (String, Unique)
full_name (String)
position (Enum: QB, RB, WR, TE, K, DEF)
age (Int)
team (String) — NFL Team Abbreviation
rosters (Snapshot of a team at a specific time)
team_id (FK)
player_id (FK)
is_starter (Boolean)
B. Derived Analytics Tables (The "Superfan" Value)
dynasty_values (The Value Engine)
player_id (FK)
date (Date) — Allows showing value over time graphs
value_score (Int) — 0-9999 score based on Proprietary Algorithm
trend_7day (Int)
Note: This table is populated by our internal expertise, not fetched from Sleeper.
power_rankings
league_id (FK)
team_id (FK)
week (Int)
season (Int)
dynasty_score (Int) — Long term value based on age/contracts
contender_score (Int) — Win-now value based on current year projections
rank (Int)
matchup_history (Deep Insights)
team_a_id (FK)
team_b_id (FK)
winner_id (FK)
score_differential (Float)
season (Int)
week (Int)
4. Compliance & Authentication Strategy
Is this legal?
Yes. Sleeper provides a public, documented API specifically for developers to build third-party tools. We operate within their Terms of Service by:
Using the "Front Door": We use their official HTTP endpoints, not unauthorized scraping.
Read-Only: We only read league data (rosters, matchups). We do not execute trades or drop players on the user's behalf, which minimizes liability.
Rate Limit Respect: Our "Smart Sync" system ensures we don't spam their servers.
Auth Flow:
User enters Sleeper Username.
We fetch their public ID and Avatar to confirm identity.
User creates an account with us (Email/Password or Google Login) to manage their subscription.
We link the Sleeper ID to our User ID.
5. Smart Sync Strategy
To ensure a fast UI and respect API limits (1000 calls/minute), we use a Tiered Sync approach.
Data Type
Frequency
Trigger
Rationale
League Settings
Low (Weekly)
On Visit (if > 7 days old)
Scoring rules rarely change mid-season.
Rosters
Medium (Daily)
On Visit (if > 24 hours old)
Trades happen, but real-time isn't strictly necessary for dynasty analysis.
Matchups
High (Live-ish)
On Dashboard Load
During the season, scores change constantly.
Player Database
Daily
Cron Job (Midnight)
Updates for IR status, team changes, and rookie additions.
Historical Data
Once
On First Import
2019-2023 history never changes. Fetch once, store forever.

The "Stale-While-Revalidate" UI Pattern:
When a user visits their dashboard:
Immediate: Serve data from our Postgres DB (even if 4 hours old). UI loads instantly.
Background: If data is "stale" (older than frequency limit), queue a sync job.
Update: When sync finishes, push new data to UI via WebSocket or show "New data available" toast.
6. Implementation Phases (MVP)
Phase 1: The Foundation
Scaffold Monorepo (Next.js + NestJS).
Setup Postgres & BullMQ.
Build SleeperProvider to fetch basic league/roster data.
Deliverable: User can login, link Sleeper user, and see their leagues.
Phase 2: The Data Ingestion
Build the LeagueSync worker with "Smart Sync" logic.
Import current rosters.
Import Draft Picks (Crucial for Dynasty).
Deliverable: A "League Dashboard" showing basic stats, but hosted on our DB.
Phase 3: The Value Engine & Archetypes
Implement the proprietary DynastyValue algorithm logic.
Create ArchetypeService to tag teams as "Contender" or "Rebuilder".
Deliverable: "Power Rankings" page with dynasty vs redraft toggle.
Phase 4: The Tools
Build Trade Generator UI using the internal value engine.
Build Transaction Search.
Deliverable: Full MVP Launch.

For all testing, manual and integration, we will use my Dynasty League
League ID: 1250847939941646336
