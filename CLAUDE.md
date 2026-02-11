# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application for Compasslex, a counseling services platform. The project is in migration phase 2, transitioning from a previous architecture to modern Next.js App Router with TypeScript.

## Commands

### Development

```bash
npm run dev              # Start dev server with Turbopack
npm run build            # Production build
npm run build:turbo      # Production build with Turbopack
npm start                # Start production server
```

### Testing

```bash
npm test                 # Run unit tests with Vitest
npm run test:ui          # Run tests with Vitest UI
npm run test:coverage    # Generate coverage report
npm run e2e              # Run Playwright e2e tests (not yet implemented)
npm run e2e:ui           # Run Playwright tests with UI
```

### Code Quality

```bash
npm run lint             # Run ESLint
npm run format           # Format all files with Prettier
npm run format:check     # Check formatting without changes
```

## Architecture

### Data Layer (Repository Pattern)

The application uses a **repository pattern** for data access, currently implemented with JSON files in `public/data/`:

- **Repository Classes**: `services/data-repository.ts`
    - `CounselorRepository`: Manages counselor data
    - `NewsletterRepository`: Manages newsletter data
    - Both implement corresponding interfaces (`ICounselorRepository`, `INewsletterRepository`)
    - **Singleton instances exported**: `counselorRepository`, `newsletterRepository` (use these instead of creating new instances)

- **In-Memory Caching**: Each repository caches data after first load to avoid redundant file I/O

- **Runtime Validation**: All JSON data is validated at runtime using Zod schemas defined in `types/models.ts`

- **Error Handling**: Repositories throw descriptive errors for:
    - Missing files (ENOENT)
    - Invalid JSON syntax
    - Schema validation failures

### Type System

- **Zod Schemas**: Runtime validation schemas in `types/models.ts`
    - `CounselorSchema`, `NewsletterSchema`
    - `CounselorDataSchema`, `NewsletterDataSchema` (wrappers for JSON structure)

- **TypeScript Interfaces**: Type definitions alongside schemas
    - `Counselor`, `Newsletter`
    - `CounselorData`, `NewsletterData`

### Path Aliases

The project uses `@/*` as a path alias that resolves to the project root:

```typescript
import { counselorRepository, newsletterRepository } from '@/services/data-repository'
import type { Counselor } from '@/types/models'

// Use singleton instances (recommended)
const counselors = await counselorRepository.getAllCounselors()
const newsletters = await newsletterRepository.getAllNewsletters()
```

### Testing Structure

- **Unit Tests**: Located in `__tests__/` directory, mirroring the source structure
    - Use Vitest with jsdom environment
    - Testing Library React for component tests
    - Tests follow the pattern: `__tests__/<directory>/<filename>.test.ts`

- **E2E Tests**: Playwright configured but no tests yet implemented
    - Test directory should be `./e2e`
    - Runs dev server automatically for tests
    - Configured for multiple browsers and devices

## Key Files

- `services/data-repository.ts`: Repository implementations with caching and validation
- `types/models.ts`: Zod schemas and TypeScript interfaces
- `public/data/*.json`: Static data files (counselor.json, newsletter.json)
- `vitest.config.ts`: Test configuration with jsdom and coverage
- `playwright.config.ts`: E2E test configuration

## Environment Variables

Required environment variables (see `.env.example`):

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API key for map integration

## Development Notes

- The project is currently in **migration phase 2** (branch: `nextjs-migration-phase-2`)
- Uses Turbopack for faster builds in development
- Strict TypeScript mode enabled
- All JSON data must pass Zod validation before use
- When adding new data sources, follow the repository pattern established in `data-repository.ts`
