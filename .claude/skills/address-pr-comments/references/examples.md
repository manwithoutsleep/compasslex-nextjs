# PR Comment Examples and How to Address Them

This document provides examples of common PR feedback patterns and how to address them effectively.

## Code Quality Issues

### Example 1: Type Safety
**Comment:**
```
The `data` parameter should be typed instead of using `any`.
Consider creating a proper interface for this.
```

**How to Address:**
1. Create or identify the appropriate TypeScript interface
2. Replace `any` with the specific type
3. Ensure all usages are type-safe
4. Commit: `fix: Replace any type with specific interface for data parameter`

### Example 2: Error Handling
**Comment:**
```
This try-catch block swallows errors silently. We should at least log them
or propagate them to the caller.
```

**How to Address:**
1. Add proper error logging with context
2. Consider re-throwing or returning error state
3. Add error boundaries if in React components
4. Commit: `fix: Add error logging and propagation in data fetch handler`

### Example 3: Missing Validation
**Comment:**
```
Should validate the input before processing. What happens if the user
passes an empty string or null?
```

**How to Address:**
1. Add input validation at the function entry point
2. Return early or throw descriptive errors for invalid input
3. Add tests for edge cases
4. Commit: `fix: Add input validation for empty/null values in processData`

## Performance Issues

### Example 4: Unnecessary Re-renders
**Comment:**
```
This component re-renders on every parent update. Consider using React.memo
or useMemo for the expensive calculation.
```

**How to Address:**
1. Identify the expensive operation
2. Wrap component in React.memo or use useMemo/useCallback
3. Verify with React DevTools that re-renders are reduced
4. Commit: `fix: Optimize component with React.memo to prevent unnecessary re-renders`

### Example 5: N+1 Queries
**Comment:**
```
This creates a database query inside a loop. Consider fetching all data
at once or using a batch operation.
```

**How to Address:**
1. Move query outside the loop
2. Use batch operations or joins
3. Consider caching if appropriate
4. Commit: `fix: Eliminate N+1 query pattern by batching data fetch`

## Architecture and Design

### Example 6: Separation of Concerns
**Comment:**
```
This component is handling both UI logic and data fetching. Consider
extracting the data logic to a custom hook or service.
```

**How to Address:**
1. Create a custom hook (e.g., `useDataFetcher`) or service class
2. Move data fetching logic to the hook/service
3. Keep component focused on rendering
4. Commit: `refactor: Extract data fetching logic into custom hook`

### Example 7: Code Duplication
**Comment:**
```
This logic is duplicated in 3 places. Should be extracted to a shared utility.
```

**How to Address:**
1. Create a utility function or hook
2. Replace all duplicated instances with the shared function
3. Add tests for the utility
4. Commit: `refactor: Extract duplicated validation logic to shared utility`

## Testing Issues

### Example 8: Missing Test Cases
**Comment:**
```
Tests only cover the happy path. What about error cases and edge conditions?
```

**How to Address:**
1. Add test cases for error scenarios
2. Add test cases for edge conditions (empty arrays, null, undefined, etc.)
3. Ensure coverage increases
4. Commit: `test: Add error and edge case coverage for getUserData`

### Example 9: Flaky Tests
**Comment:**
```
This test uses setTimeout and sometimes fails in CI. Consider using
waitFor or testing-library queries instead.
```

**How to Address:**
1. Replace setTimeout with testing-library's `waitFor`
2. Use proper async queries (`findBy*`)
3. Ensure tests are deterministic
4. Commit: `fix: Replace setTimeout with waitFor to fix flaky test`

## Documentation Issues

### Example 10: Missing JSDoc
**Comment:**
```
Complex function should have JSDoc explaining parameters and return value.
```

**How to Address:**
1. Add comprehensive JSDoc with @param and @returns
2. Document any side effects or assumptions
3. Include usage examples for complex APIs
4. Commit: `docs: Add JSDoc documentation for complex utility functions`

## Security Issues

### Example 11: XSS Vulnerability
**Comment:**
```
Using dangerouslySetInnerHTML without sanitization. This could lead to XSS.
```

**How to Address:**
1. Remove dangerouslySetInnerHTML if possible
2. If necessary, use a sanitization library (DOMPurify)
3. Document why it's needed
4. Commit: `fix: Sanitize HTML content to prevent XSS vulnerability`

### Example 12: Exposed Secrets
**Comment:**
```
API key should not be hardcoded. Use environment variables.
```

**How to Address:**
1. Move to environment variable
2. Update .env.example
3. Add to documentation
4. Commit: `fix: Move API key to environment variable`

## Accessibility Issues

### Example 13: Missing Alt Text
**Comment:**
```
Images should have descriptive alt text for screen readers.
```

**How to Address:**
1. Add meaningful alt text to all images
2. Use empty alt="" for decorative images
3. Consider ARIA labels where appropriate
4. Commit: `fix: Add descriptive alt text for accessibility`

### Example 14: Keyboard Navigation
**Comment:**
```
This custom dropdown isn't keyboard accessible. Should support arrow keys
and escape to close.
```

**How to Address:**
1. Add keyboard event handlers
2. Implement ARIA attributes
3. Test with keyboard only
4. Commit: `fix: Add keyboard navigation support to custom dropdown`
