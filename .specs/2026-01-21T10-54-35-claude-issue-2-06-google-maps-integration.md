# 2026-01-21T10-54-35-claude-issue-2-06: Google Maps Integration

## Parent Specification

This is sub-task 06 of the parent specification: `2026-01-21T10-54-35-claude-issue-2.md`
The sub-tasks are coordinated by `2026-01-21T10-54-35-claude-issue-2-00-coordinator.md`

## Objective

Implement Google Maps integration using `@googlemaps/js-api-loader` as a client component, displaying the Compass Christian Counseling office location with a marker. Integrate the map component into the appropriate page (likely contact-us).

## Dependencies

**Prerequisites** (must be completed before this task):

- Task 01: Development Environment Setup (Google Maps loader installed, API key configured)
- Task 04: Layouts, Navigation & Foundations (page structure available)

**Blocks** (tasks that depend on this one):

- Task 07: Testing, QA & Deployment (requires maps working)

**Parallel Opportunities**:

- Task 05: Page Implementations (can run mostly in parallel - integrate at end)

## Scope

### In Scope

- Create GoogleMap client component
- Load Google Maps JavaScript API using `@googlemaps/js-api-loader`
- Display map centered on Lexington, KY (Compass Christian Counseling office)
- Place marker on office location
- Configure map styling to match Angular implementation
- Write comprehensive unit tests (TDD with mocks)
- Integrate map into contact-us page
- Handle loading states and errors gracefully

### Out of Scope

- Multiple map markers
- Directions/routing features
- Street view integration
- Custom map styling themes
- Geocoding/search functionality
- Map controls beyond defaults

## Implementation Requirements

### Technology Stack

- `@googlemaps/js-api-loader` package
- React hooks (useEffect, useRef)
- TypeScript for type safety
- Vitest with mocked Google Maps API

### Office Location

**Address**: Compass Christian Counseling, Lexington, KY

**Coordinates** (from Angular app):

- Latitude: 38.0406
- Longitude: -84.5037

**Verify** these coordinates by checking:

- `../compasslex.com/src/app/components/pages/contact-us/contact-us.component.ts`
- `../compasslex.com/src/app/components/shared/google-map/google-map.component.ts`

### TDD Approach with Mocking

Google Maps requires mocking for tests:

```typescript
// Mock @googlemaps/js-api-loader
vi.mock('@googlemaps/js-api-loader', () => ({
    Loader: vi.fn().mockImplementation(() => ({
        load: vi.fn().mockResolvedValue({
            maps: {
                Map: vi.fn(),
                Marker: vi.fn(),
            },
        }),
    })),
}));
```

## Implementation Steps

### Step 1: Create GoogleMap Component Test (TDD)

**File**: `__tests__/components/google-map.test.tsx`

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import GoogleMap from '@/components/google-map'

// Mock Google Maps API
vi.mock('@googlemaps/js-api-loader', () => ({
  Loader: vi.fn().mockImplementation(() => ({
    load: vi.fn().mockResolvedValue({
      maps: {
        Map: vi.fn(),
        Marker: vi.fn(),
      },
    }),
  })),
}))

describe('GoogleMap Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render map container', () => {
    render(<GoogleMap />)
    expect(screen.getByTestId('google-map')).toBeInTheDocument()
  })

  it('should have correct styling classes', () => {
    render(<GoogleMap />)
    const mapContainer = screen.getByTestId('google-map')
    expect(mapContainer.className).toContain('w-full')
    expect(mapContainer.className).toContain('h-96')
  })

  it('should accept custom center prop', () => {
    const customCenter = { lat: 40.7128, lng: -74.006 }
    render(<GoogleMap center={customCenter} />)
    expect(screen.getByTestId('google-map')).toBeInTheDocument()
  })

  it('should accept custom zoom prop', () => {
    render(<GoogleMap zoom={15} />)
    expect(screen.getByTestId('google-map')).toBeInTheDocument()
  })

  it('should use default Lexington coordinates', () => {
    render(<GoogleMap />)
    // Default center should be Lexington, KY
    expect(screen.getByTestId('google-map')).toBeInTheDocument()
  })

  it('should initialize map on mount', async () => {
    const { Loader } = await import('@googlemaps/js-api-loader')
    render(<GoogleMap />)

    await waitFor(() => {
      expect(Loader).toHaveBeenCalled()
    })
  })
})
```

### Step 2: Implement GoogleMap Component

**File**: `components/google-map.tsx`

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface GoogleMapProps {
  center?: { lat: number; lng: number }
  zoom?: number
  className?: string
}

/**
 * Google Maps component displaying office location
 * Client component required for interactive map
 */
export default function GoogleMap({
  center = { lat: 38.0406, lng: -84.5037 }, // Lexington, KY
  zoom = 12,
  className = '',
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
      libraries: ['marker'],
    })

    loader
      .load()
      .then(() => {
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
          })

          // Add marker for office location
          new google.maps.Marker({
            position: center,
            map,
            title: 'Compass Christian Counseling',
          })

          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.error('Error loading Google Maps:', err)
        setError('Failed to load map')
        setIsLoading(false)
      })
  }, [center, zoom])

  if (error) {
    return (
      <div
        data-testid="google-map"
        className={`w-full h-96 bg-gray-200 flex items-center justify-center rounded shadow-md ${className}`}
      >
        <p className="text-gray-600">Unable to load map</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
          <p className="text-gray-600">Loading map...</p>
        </div>
      )}
      <div
        ref={mapRef}
        data-testid="google-map"
        className={`w-full h-96 rounded shadow-md ${className}`}
      />
    </div>
  )
}
```

### Step 3: Run Tests

```bash
tsc --noEmit
npx eslint --fix components/google-map.tsx __tests__/components/google-map.test.tsx
npx prettier --write components/google-map.tsx __tests__/components/google-map.test.tsx
npx vitest run __tests__/components/google-map.test.tsx
```

### Step 4: Integrate Map into Contact Us Page

**Update**: `app/contact-us/page.tsx`

```typescript
import { Heading } from '@/components/ui'
import GoogleMap from '@/components/google-map'

export const metadata = {
  title: 'Contact Us - Compass Christian Counseling',
  description: 'Contact Compass Christian Counseling in Lexington, Kentucky',
}

export default function ContactUsPage() {
  return (
    <div className="py-8">
      <Heading level={1}>Contact Us</Heading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-deep-sapphire mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-deep-sapphire">Phone</h3>
              <p className="text-gray-700">(859) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold text-deep-sapphire">Email</h3>
              <p className="text-gray-700">info@compasslex.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-deep-sapphire">Address</h3>
              <p className="text-gray-700">
                123 Main Street
                <br />
                Lexington, KY 40507
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-deep-sapphire">Office Hours</h3>
              <p className="text-gray-700">
                Monday - Friday: 9:00 AM - 5:00 PM
                <br />
                Saturday: By appointment
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-deep-sapphire mb-4">Our Location</h2>
          <GoogleMap />
        </div>
      </div>
    </div>
  )
}
```

**Note**: Extract actual contact information from Angular app:

- `../compasslex.com/src/app/components/pages/contact-us/contact-us.component.html`

### Step 5: Manual Testing

```bash
npm run dev
# Navigate to http://localhost:3000/contact-us
# Verify:
# - Map loads successfully
# - Marker appears at correct location
# - Map is interactive (pan, zoom)
# - Loading state shows briefly
# - Error handling works (test by removing API key)
```

## Files to Create/Modify

- `components/google-map.tsx` - Google Maps component
- `__tests__/components/google-map.test.tsx` - Component tests
- `app/contact-us/page.tsx` - Update to integrate map (if not already done in Task 05)

## Testing Requirements

### Unit Tests (with Mocks)

- Map container renders
- Default center coordinates (Lexington, KY)
- Custom center and zoom props work
- Loader is called on mount
- Loading state displays
- Error state displays

### Manual Tests

- Map loads on contact-us page
- Marker displays at correct location
- Map is interactive
- Map styling matches Angular version
- Responsive on mobile/tablet/desktop
- Error handling works

## Success Criteria

- [ ] `components/google-map.tsx` created with full implementation
- [ ] `__tests__/components/google-map.test.tsx` created with mocked tests
- [ ] All Google Maps tests pass
- [ ] Map integrated into contact-us page
- [ ] Map displays correctly in dev environment
- [ ] Map displays correctly in production build
- [ ] Marker appears at correct location
- [ ] Map is interactive (pan, zoom)
- [ ] Loading state works
- [ ] Error handling works
- [ ] TypeScript compilation succeeds
- [ ] ESLint passes
- [ ] Prettier formatting applied
- [ ] Map visually matches Angular implementation
- [ ] Responsive design works

## Notes

### Environment Variable Requirement

**Critical**: Ensure `.env.local` contains:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<actual-key>
```

The `NEXT_PUBLIC_` prefix exposes the variable to client components.

### Google Maps API Key Restrictions

Verify API key restrictions in Google Cloud Console:

- HTTP referrers (websites) restriction
- Allow `localhost:3000` for development
- Allow production domain for deployment

### Client Component Requirement

Maps MUST be a client component (`'use client'`) because:

- Requires browser APIs (DOM manipulation)
- Uses React hooks (useEffect, useRef, useState)
- Interactive (user can pan/zoom)

### Performance Considerations

- Map loads asynchronously (doesn't block page render)
- Loading state prevents layout shift
- Consider lazy loading if map is below fold

### Troubleshooting

**If map doesn't load**:

- Check API key is set correctly in `.env.local`
- Check browser console for errors
- Verify API key has Maps JavaScript API enabled
- Check API key restrictions

**If tests fail**:

- Verify mocks are set up correctly
- Check `vi.mock` is before describe block
- Ensure `@googlemaps/js-api-loader` is mocked

---

**Task Created**: 2026-01-21
**Estimated Duration**: 6-8 hours
**Complexity**: Medium
**Risk Level**: Medium (API integration)
