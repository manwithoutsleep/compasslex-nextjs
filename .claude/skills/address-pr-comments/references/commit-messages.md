# Commit Message Guidelines for PR Fixes

Guidelines and examples for writing clear, descriptive commit messages when addressing PR feedback.

## Format

```
<type>: <brief description>

[Optional: Longer explanation if needed]
[Optional: Reference to PR comment or issue]
```

## Types

- **fix**: Bug fixes or corrections
- **refactor**: Code changes that neither fix bugs nor add features
- **test**: Adding or updating tests
- **docs**: Documentation changes
- **perf**: Performance improvements
- **style**: Code style/formatting changes (not CSS)
- **chore**: Other changes that don't modify src or test files

## Guidelines

1. **Be specific**: Describe what changed, not why (unless non-obvious)
2. **Use imperative mood**: "Add feature" not "Added feature" or "Adds feature"
3. **Reference the issue**: Mention what PR comment or issue this addresses
4. **Keep it concise**: First line should be under 72 characters
5. **Focus on one thing**: Each commit should address a single concern

## Examples

### Type Safety Fixes

✅ **Good:**

```
fix: Replace any type with CounselorData interface in getCounselor
```

❌ **Bad:**

```
fix: types
```

✅ **Good with context:**

```
fix: Add proper TypeScript types to newsletter repository methods

Replaces `any` types with specific interfaces (Newsletter, NewsletterData)
to improve type safety and catch potential runtime errors.
```

### Error Handling Fixes

✅ **Good:**

```
fix: Add error logging and propagation in data fetch handler
```

✅ **Good with context:**

```
fix: Improve error handling in counselor repository

- Add descriptive error messages with context
- Log errors with stack traces for debugging
- Propagate errors to caller instead of swallowing
```

### Validation Fixes

✅ **Good:**

```
fix: Add input validation for empty/null values in processData
```

✅ **Good:**

```
fix: Validate newsletter ID before database query
```

### Performance Fixes

✅ **Good:**

```
fix: Optimize component with React.memo to prevent unnecessary re-renders
```

✅ **Good:**

```
perf: Eliminate N+1 query pattern by batching counselor data fetch
```

✅ **Good with context:**

```
perf: Cache newsletter data to avoid redundant file reads

Added in-memory caching to newsletterRepository to prevent reading
the JSON file on every request. Cache is populated on first read.
```

### Refactoring

✅ **Good:**

```
refactor: Extract data fetching logic into useNewsletterData hook
```

✅ **Good:**

```
refactor: Extract duplicated validation logic to shared utility
```

✅ **Good with context:**

```
refactor: Split large component into smaller, focused components

Extracted NewsletterCard, NewsletterFilters, and NewsletterSort into
separate components to improve maintainability and testability.
```

### Testing Fixes

✅ **Good:**

```
test: Add error and edge case coverage for getUserData
```

✅ **Good:**

```
fix: Replace setTimeout with waitFor to fix flaky test
```

✅ **Good with context:**

```
test: Add comprehensive test coverage for newsletter repository

Added tests for:
- Successful data retrieval
- File not found errors
- Invalid JSON handling
- Schema validation failures
```

### Documentation Fixes

✅ **Good:**

```
docs: Add JSDoc documentation for complex utility functions
```

✅ **Good:**

```
docs: Update README with environment variable requirements
```

### Security Fixes

✅ **Good:**

```
fix: Sanitize HTML content to prevent XSS vulnerability
```

✅ **Good:**

```
fix: Move API key to environment variable
```

✅ **Good with context:**

```
fix: Add input sanitization to prevent XSS attacks

Implemented DOMPurify to sanitize user-generated HTML content
before rendering. All dangerouslySetInnerHTML usage now sanitized.
```

### Accessibility Fixes

✅ **Good:**

```
fix: Add descriptive alt text for accessibility
```

✅ **Good:**

```
fix: Add keyboard navigation support to custom dropdown
```

✅ **Good with context:**

```
fix: Improve keyboard accessibility for modal dialogs

- Add escape key to close
- Trap focus within modal when open
- Return focus to trigger element on close
- Add ARIA labels for screen readers
```

### Multiple Related Changes

When addressing multiple related points from the same PR comment:

✅ **Good:**

```
fix: Improve newsletter component type safety and error handling

- Replace any types with Newsletter interface
- Add input validation for null/undefined
- Add error boundaries for fetch failures
```

### Breaking Down Large Changes

When a PR comment requires multiple distinct changes, create separate commits:

✅ **Good (separate commits):**

```
Commit 1: refactor: Extract newsletter data fetching to custom hook
Commit 2: test: Add test coverage for useNewsletterData hook
Commit 3: docs: Add JSDoc documentation for newsletter hooks
```

❌ **Bad (one large commit):**

```
fix: address PR feedback
```

## Special Cases

### Reverting Previous Changes

```
revert: Remove incorrect error handling from previous commit

This reverts commit a1b2c3d4. The error handling approach was
incorrect and caused issues in edge cases.
```

### Hotfix for Build/Test Failures

```
fix: Correct import path causing TypeScript error

Fixes build failure introduced in previous commit.
```

### Responding to Specific Feedback

```
fix: Use strict equality check instead of loose equality

Addresses PR comment about type coercion issues.
Per reviewer feedback in PR #123.
```

## Co-Authorship

When implementing someone else's suggestion directly:

```
fix: Add input validation per reviewer suggestion

Co-Authored-By: Reviewer Name <reviewer@email.com>
```

## Commit Message Length

- **First line**: Max 72 characters (ideally 50)
- **Body**: Wrap at 72 characters
- **Separate body from subject** with a blank line

```
fix: Add newsletter sorting by publication date

Previously newsletters were displayed in arbitrary order from the
JSON file. Now sorted by publicationDate descending, showing the
most recent newsletters first.

Addresses feedback in PR #123.
```
