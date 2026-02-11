import { describe, it, expect, beforeAll } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * Tailwind v4 Configuration Tests
 *
 * Since Tailwind v4 uses CSS-based @theme configuration instead of tailwind.config.ts,
 * these tests verify that all theme values are correctly defined in app/globals.css.
 *
 * This ensures:
 * - All 10 custom brand colors are present with correct hex values
 * - Layout constraints are properly configured
 * - Custom border widths are defined
 * - Typography (Roboto font) is configured
 */
describe('Tailwind v4 CSS Configuration', () => {
  let globalsCSS: string

  // Read the globals.css file once for all tests
  beforeAll(() => {
    const globalsPath = join(process.cwd(), 'app', 'globals.css')
    globalsCSS = readFileSync(globalsPath, 'utf-8')
  })

  describe('Color Palette - Brand Colors', () => {
    it('should define all 10 custom brand colors', () => {
      const expectedColors = [
        // New site colors
        'polar-mist',
        'bengal-blue',
        'raspberry-smoothie',
        'north-pole-blue',
        'ultra-pure-white',
        // Old site colors (primary palette)
        'deep-sapphire',
        'warm-sand',
        'peach-puff',
        'pure-white',
        'royal-indigo',
      ]

      expectedColors.forEach((color) => {
        expect(globalsCSS, `Color "${color}" should be defined in @theme`).toMatch(
          new RegExp(`--color-${color}:`)
        )
      })
    })

    describe('New Site Colors', () => {
      it('should define polar-mist with correct hex value', () => {
        expect(globalsCSS).toMatch(/--color-polar-mist:\s*#ddeff7/)
      })

      it('should define bengal-blue with correct hex value', () => {
        expect(globalsCSS).toMatch(/--color-bengal-blue:\s*#b1cfdd/)
      })

      it('should define raspberry-smoothie with correct hex value', () => {
        expect(globalsCSS).toMatch(/--color-raspberry-smoothie:\s*#c6a3b3/)
      })

      it('should define north-pole-blue with correct hex value', () => {
        expect(globalsCSS).toMatch(/--color-north-pole-blue:\s*#709eb4/)
      })

      it('should define ultra-pure-white with correct hex value', () => {
        expect(globalsCSS).toMatch(/--color-ultra-pure-white:\s*#f8f9f3/)
      })
    })

    describe('Old Site Colors (Primary Palette)', () => {
      it('should define deep-sapphire with correct hex value', () => {
        expect(globalsCSS).toMatch(/--color-deep-sapphire:\s*#191248/)
      })

      it('should define warm-sand with correct hex value', () => {
        expect(globalsCSS).toMatch(/--color-warm-sand:\s*#f2c58a/)
      })

      it('should define peach-puff with correct hex value', () => {
        expect(globalsCSS).toMatch(/--color-peach-puff:\s*#fbe3c9/)
      })

      it('should define pure-white with correct hex value', () => {
        expect(globalsCSS).toMatch(/--color-pure-white:\s*#ffffff/)
      })

      it('should define royal-indigo with correct hex value', () => {
        expect(globalsCSS).toMatch(/--color-royal-indigo:\s*#43208a/)
      })
    })
  })

  describe('Typography Configuration', () => {
    it('should configure Roboto as the primary sans-serif font', () => {
      expect(globalsCSS).toMatch(/--font-family-sans:\s*['"]Roboto['"]/)
    })

    it('should include fallback fonts in font stack', () => {
      expect(globalsCSS).toMatch(/--font-family-sans:.*sans-serif/)
    })
  })

  describe('Layout Constraints', () => {
    it('should define max-width-site constraint', () => {
      expect(globalsCSS).toMatch(/--max-width-site:\s*1440px/)
    })

    it('should define min-width-site constraint', () => {
      expect(globalsCSS).toMatch(/--min-width-site:\s*320px/)
    })
  })

  describe('@theme Block Structure', () => {
    it('should have @theme directive for Tailwind v4 configuration', () => {
      expect(globalsCSS).toContain('@theme')
    })

    it('should import tailwindcss at the beginning', () => {
      expect(globalsCSS).toMatch(/^@import\s+['"]tailwindcss['"]/)
    })
  })

  describe('Global Styles', () => {
    it('should apply Roboto font to body element', () => {
      expect(globalsCSS).toMatch(/body\s*{[^}]*font-family:\s*var\(--font-family-sans\)/)
    })

    it('should set default background color on body', () => {
      expect(globalsCSS).toMatch(/body\s*{[^}]*background-color:\s*transparent/)
    })

    it('should set default text color on body', () => {
      expect(globalsCSS).toMatch(/body\s*{[^}]*color:\s*var\(--color-deep-sapphire\)/)
    })
  })

  describe('Footer Background Image', () => {
    // Slice from @layer utilities onward so all assertions are scoped to that block
    let layerUtilitiesContent: string

    beforeAll(() => {
      const startIndex = globalsCSS.indexOf('@layer utilities')
      layerUtilitiesContent = startIndex >= 0 ? globalsCSS.slice(startIndex) : ''
    })

    it('should be defined inside @layer utilities to override Tailwind preflight reset', () => {
      expect(layerUtilitiesContent).not.toBe('')
      expect(layerUtilitiesContent).toContain('background-image')
    })

    it('should use the footer horizon image URL', () => {
      expect(layerUtilitiesContent).toMatch(
        /background-image:\s*url\(['"]?\/assets\/site-images\/footer-horizon\.jpg['"]?\)/
      )
    })

    it('should only apply on desktop screens via min-width: 600px media query', () => {
      expect(layerUtilitiesContent).toMatch(/@media screen and \(min-width:\s*600px\)/)
    })

    it('should use contain background-size so image spans full browser width', () => {
      expect(layerUtilitiesContent).toMatch(/background-size:\s*contain/)
    })

    it('should position background at bottom center', () => {
      expect(layerUtilitiesContent).toMatch(/background-position:\s*bottom center/)
    })

    it('should not repeat the background image', () => {
      expect(layerUtilitiesContent).toMatch(/background-repeat:\s*no-repeat/)
    })

    it('should scroll with page content via local background-attachment', () => {
      expect(layerUtilitiesContent).toMatch(/background-attachment:\s*local/)
    })
  })
})
