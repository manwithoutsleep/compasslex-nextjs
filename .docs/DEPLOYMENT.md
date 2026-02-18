# Deployment Instructions

## Overview

This Next.js application is configured for deployment on Vercel, which provides automatic builds, deployments, and hosting.

## Prerequisites

- GitHub repository connected to Vercel
- Google Maps API key for map integration
- Node.js 18.x or higher

## Vercel Setup

### 1. Connect Repository to Vercel

1. Log in to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `manwithoutsleep/compasslex-nextjs`
4. Vercel will automatically detect the Next.js framework

### 2. Configure Environment Variables

In the Vercel dashboard, add the following environment variable:

| Name                              | Value                      | Description                    |
| --------------------------------- | -------------------------- | ------------------------------ |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | `your-google-maps-api-key` | Google Maps JavaScript API key |

**Note**: The `NEXT_PUBLIC_` prefix makes the variable available in the browser.

### 3. Deploy

Vercel will automatically deploy your application on every push to the main branch.

For manual deployments:

```bash
npm install -g vercel
vercel --prod
```

## Build Verification

Before deploying to production, verify the build locally:

```bash
# Install dependencies
npm install

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests
npm test

# Build the application
npm run build

# Start the production server
npm run start
```

The application should be accessible at `http://localhost:3000`

### Local Build Checklist

- [ ] TypeScript compiles without errors
- [ ] ESLint passes with no errors
- [ ] All tests pass
- [ ] Production build completes successfully
- [ ] Application runs correctly in production mode
- [ ] All pages load without errors
- [ ] Google Maps displays correctly
- [ ] All counselor profiles are accessible
- [ ] All newsletter PDFs are downloadable

## Post-Deployment Verification

After deploying to Vercel, verify:

### Functionality

- [ ] All pages load correctly
- [ ] Navigation works across all pages
- [ ] Google Maps displays on Contact Us page
- [ ] All 11 counselor profiles are accessible
- [ ] All 24 newsletter PDFs are downloadable
- [ ] 404 page displays for non-existent routes
- [ ] Mobile menu works correctly
- [ ] Links open in correct tabs (internal/external)

### Performance

- [ ] Lighthouse Performance score >90
- [ ] First Contentful Paint <1.8s
- [ ] Time to Interactive <3.8s
- [ ] Cumulative Layout Shift <0.1

### Accessibility

- [ ] Lighthouse Accessibility score >90
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA
- [ ] All images have alt text
- [ ] ARIA labels are present where needed

### SEO

- [ ] Lighthouse SEO score >90
- [ ] Page titles are descriptive
- [ ] Meta descriptions are present
- [ ] Robots.txt allows crawling
- [ ] Sitemap is accessible

### Cross-Browser Testing

Test in the following browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

## Environment-Specific Configuration

### Development

- `npm run dev` - Runs on `http://localhost:3000`
- Hot module replacement enabled
- Source maps included
- Detailed error messages

### Production

- Optimized builds with code splitting
- Minified JavaScript and CSS
- Image optimization enabled
- Static generation for all pages

## Troubleshooting

### Build Failures

If the build fails on Vercel:

1. Check the build logs in Vercel dashboard
2. Verify all environment variables are set correctly
3. Ensure `package.json` and `package-lock.json` are up to date
4. Check for TypeScript errors: `npm run type-check`
5. Check for linting errors: `npm run lint`

### Runtime Errors

If the deployed app has errors:

1. Check Vercel function logs
2. Verify environment variables are set
3. Check browser console for client-side errors
4. Verify data files are present in `/public/data/`

### Google Maps Not Displaying

1. Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set in Vercel
2. Check that the API key has Maps JavaScript API enabled
3. Verify the API key has no domain restrictions or includes your Vercel domain
4. Check browser console for API errors

## Rollback Procedure

If a deployment has issues:

1. Go to Vercel dashboard
2. Select the project
3. Go to "Deployments" tab
4. Find the last working deployment
5. Click the three dots menu
6. Select "Promote to Production"

## Monitoring

### Vercel Analytics

Vercel provides built-in analytics for:

- Page views
- Visitors
- Top pages
- Devices and browsers
- Geographic distribution

Access analytics in the Vercel dashboard under "Analytics".

### Error Tracking

Monitor errors through:

- Vercel function logs
- Browser console errors
- Vercel deployment logs

## Performance Optimization

### Current Optimizations

- Next.js Image component for automatic image optimization
- Static generation for all pages
- Automatic code splitting
- Font optimization with `next/font`
- Automatic AVIF/WebP image formats

### Bundle Analysis

To analyze bundle size:

```bash
npm run build
# Review the output for bundle sizes
```

Target metrics:

- First Load JS: <200KB
- Total bundle: <300KB (gzipped)

## Security

### Headers

Vercel automatically sets security headers:

- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection

### SSL/TLS

Vercel provides automatic HTTPS with free SSL certificates.

### Environment Variables

Never commit sensitive data to the repository. Always use Vercel environment variables for:

- API keys
- Secrets
- Credentials

## Domain Configuration

To use a custom domain:

1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed by Vercel
5. Vercel will automatically provision SSL certificate

## Support

For issues with:

- **Vercel platform**: [Vercel Support](https://vercel.com/support)
- **Next.js framework**: [Next.js Documentation](https://nextjs.org/docs)
- **Application code**: Open an issue on GitHub

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
