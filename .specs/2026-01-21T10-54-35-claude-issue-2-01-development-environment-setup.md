# 2026-01-21T10-54-35-claude-issue-2-01: Development Environment Setup

## Parent Specification

This is sub-task 01 of the parent specification: `2026-01-21T10-54-35-claude-issue-2.md`
The sub-tasks are coordinated by `2026-01-21T10-54-35-claude-issue-2-00-coordinator.md`

## Objective

Set up the complete development environment for the Next.js migration, including all necessary dependencies, testing frameworks, development tools, and environment configuration. This establishes the foundation for all subsequent implementation work.

## Dependencies

**Prerequisites** (must be completed before this task):

- None - This is the first task

**Blocks** (tasks that depend on this one):

- Task 02: Core Infrastructure & Data Layer
- Task 03: Design System & Tailwind
- All subsequent tasks

**Parallel Opportunities**:

- None - This must complete before other tasks can begin

## Scope

This task covers the initial setup and configuration of the development environment in the `compasslex-nextjs` repository. The Next.js 15 project has already been initialized via Vercel's Next.js Boilerplate, so this task focuses on adding additional dependencies and configuration.

### In Scope

- Install additional npm dependencies (testing libraries, Google Maps loader, Prettier plugins)
- Configure environment variables for Google Maps API key
- Set up Vitest testing infrastructure with configuration
- Configure Playwright for E2E testing
- Set up Prettier with Tailwind plugin
- Create initial Vitest configuration file
- Create initial Playwright configuration file
- Verify build pipeline works
- Verify all tooling is correctly configured

### Out of Scope

- Creating any application code (components, pages, services)
- Writing any tests (test configuration only)
- Copying assets from Angular repo (handled in Task 02)
- Tailwind theme configuration (handled in Task 03)
- Any implementation work

## Implementation Requirements

### Technology Stack

- Node.js environment (already set up)
- npm package manager
- PowerShell command shell (Windows 11)

### Dependencies to Install

**Testing Libraries**:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom happy-dom
```

**E2E Testing**:

```bash
npm install -D @playwright/test
```

**Code Quality Tools**:

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

**Google Maps Integration**:

```bash
npm install @googlemaps/js-api-loader
```

### Configuration Files to Create

#### 1. Vitest Configuration (`vitest.config.ts`)

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
        globals: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', '.next/', 'coverage/', '**/*.config.ts', '**/*.config.js'],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './'),
        },
    },
});
```

#### 2. Vitest Setup File (`vitest.setup.ts`)

```typescript
import '@testing-library/jest-dom/vitest';
```

#### 3. Playwright Configuration (`playwright.config.ts`)

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },
});
```

#### 4. Prettier Configuration (`.prettierrc.json`)

```json
{
    "semi": false,
    "singleQuote": true,
    "tabWidth": 2,
    "useTabs": false,
    "trailingComma": "es5",
    "printWidth": 100,
    "plugins": ["prettier-plugin-tailwindcss"]
}
```

#### 5. Prettier Ignore File (`.prettierignore`)

```
.next
node_modules
dist
build
coverage
.vercel
```

### Environment Variables

#### Create `.env.example`:

```env
# Google Maps API Key (required for map integration)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

#### Create `.env.local` (git-ignored):

Read the Google Maps API key from the Angular repository at one of these locations:

- `../compasslex.com/.env`
- `../compasslex.com/src/environments/environment.ts`

Then create `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<actual-key-from-angular-repo>
```

### Update `package.json` Scripts

Add or verify these npm scripts exist:

```json
{
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint",
        "test": "vitest",
        "test:ui": "vitest --ui",
        "test:coverage": "vitest run --coverage",
        "e2e": "playwright test",
        "e2e:ui": "playwright test --ui",
        "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
        "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,md}\""
    }
}
```

## Files to Create/Modify

- `vitest.config.ts` - Vitest configuration with jsdom, coverage, and path aliases
- `vitest.setup.ts` - Test setup file for @testing-library/jest-dom
- `playwright.config.ts` - Playwright E2E test configuration
- `.prettierrc.json` - Prettier configuration with Tailwind plugin
- `.prettierignore` - Prettier ignore patterns
- `.env.example` - Example environment variables file (committed to git)
- `.env.local` - Local environment variables with actual API key (git-ignored)
- `package.json` - Updated with additional scripts and dependencies
- `.gitignore` - Verify `.env.local` is included

## Testing Requirements

Since this task is about setup and configuration, testing involves verification rather than writing tests:

### Verification Steps

1. **Verify npm dependencies installed**:

    ```powershell
    npm list vitest @testing-library/react @playwright/test prettier @googlemaps/js-api-loader
    ```

2. **Verify TypeScript compilation works**:

    ```bash
    tsc --noEmit
    ```

3. **Verify Vitest configuration is valid**:

    ```bash
    npx vitest --version
    npx vitest run --reporter=verbose --no-coverage
    ```

    Expected: Vitest runs successfully (even with no tests yet)

4. **Verify Playwright installation**:

    ```bash
    npx playwright install
    npx playwright test --list
    ```

    Expected: Playwright lists 0 tests (none created yet)

5. **Verify Prettier configuration**:

    ```bash
    npx prettier --check "**/*.{ts,tsx,json,md}"
    ```

    Expected: Prettier runs successfully

6. **Verify build pipeline**:

    ```bash
    npm run build
    ```

    Expected: Build completes successfully with no errors

7. **Verify dev server starts**:

    ```bash
    npm run dev
    ```

    Expected: Dev server starts on http://localhost:3000 with no errors

8. **Verify environment variables**:
    - Check that `.env.local` exists and contains `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
    - Check that `.env.example` exists with placeholder value
    - Verify `.env.local` is in `.gitignore`

## Success Criteria

- [ ] All npm dependencies installed successfully
- [ ] `vitest.config.ts` created with correct configuration
- [ ] `vitest.setup.ts` created with @testing-library/jest-dom
- [ ] `playwright.config.ts` created with multi-browser configuration
- [ ] `.prettierrc.json` created with Tailwind plugin
- [ ] `.prettierignore` created
- [ ] `.env.example` created with placeholder values
- [ ] `.env.local` created with actual Google Maps API key from Angular repo
- [ ] `package.json` updated with test, e2e, and format scripts
- [ ] `.gitignore` includes `.env.local`
- [ ] TypeScript compilation succeeds (`tsc --noEmit`)
- [ ] Vitest runs without errors (`npx vitest --version` and dry run)
- [ ] Playwright installed (`npx playwright install` succeeds)
- [ ] Prettier runs successfully (`npx prettier --check "**/*.{ts,tsx,json,md}"`)
- [ ] Build completes successfully (`npm run build`)
- [ ] Dev server starts without errors (`npm run dev`)
- [ ] All configuration files have no syntax errors
- [ ] Path aliases (`@/`) configured correctly in vitest.config.ts

## Notes

### Important Considerations

1. **PowerShell Syntax**: All commands in this task use standard npm/npx syntax which works identically in PowerShell

2. **Angular Repo Reference**: When retrieving the Google Maps API key, reference the Angular repo at `../compasslex.com/` but do NOT modify any files there

3. **Git Ignore**: Ensure `.env.local` is git-ignored to prevent committing API keys

4. **Playwright Browsers**: The first run of `npx playwright install` will download browser binaries (Chromium, Firefox, WebKit). This may take a few minutes.

5. **No Tests Yet**: It's expected that running `npx vitest run` or `npx playwright test` will show 0 tests at this stage. This is correct.

6. **TypeScript Configuration**: The `tsconfig.json` should already exist from the Next.js boilerplate initialization. Verify it includes path aliases if needed.

7. **Coverage Directory**: The `.gitignore` should include `coverage/` to avoid committing test coverage reports

### Troubleshooting

**If Vitest fails to run**:

- Check that `jsdom` or `happy-dom` is installed
- Verify `vitest.config.ts` has no syntax errors
- Check that `@vitejs/plugin-react` is installed

**If Playwright fails to install**:

- Ensure sufficient disk space for browser downloads
- Check network connectivity
- Try `npx playwright install --with-deps` if system dependencies are missing

**If build fails**:

- Check for TypeScript errors with `tsc --noEmit`
- Verify `next.config.js` has no syntax errors
- Check that all peer dependencies are satisfied

### Next Steps

After this task is complete:

- Task 02 (Core Infrastructure & Data Layer) can begin
- Task 03 (Design System & Tailwind) can begin
- Both tasks can run in parallel as they have no file overlap

---

**Task Created**: 2026-01-21
**Estimated Duration**: 2-3 hours
**Complexity**: Low
**Risk Level**: Low
