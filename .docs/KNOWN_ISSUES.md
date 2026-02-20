# Known Issues and Limitations

This document tracks known issues and limitations in the Next.js migration.

## Accessibility

### Contact-Us Page: Landmark-Unique Violation (Moderate Impact)

**Status**: Accepted limitation
**Browsers Affected**: Chromium, Firefox
**Browsers Passing**: Webkit (Safari)
**Impact**: Moderate

**Description**:
The contact-us page has two Google Maps components (one in main content, one in footer). Google Maps internally renders `<div aria-label="Map" role="region">` elements. Since we have two maps on the same page, this creates duplicate landmarks with identical aria-labels, violating the `landmark-unique` rule.

**Why Not Fixed**:

- Google Maps creates these internal elements automatically - we cannot control their attributes
- We have added unique aria-labels to our wrapper divs (`google-map-contact` and `google-map-footer`), but the internal Google Maps elements remain identical
- The violation is **moderate** impact (not critical)
- Safari/Webkit passes this test, suggesting browser-specific differences in how the rule is evaluated
- Fixing would require either:
    - Removing one map (design change)
    - Replacing footer map with static image (functionality change)
    - Complex DOM manipulation of Google Maps internals (fragile, uncertain success)

**Axe-Core Rule**: https://dequeuniversity.com/rules/axe/4.11/landmark-unique

**Test Results**:

- ✅ Webkit: PASS
- ❌ Chromium: FAIL
- ❌ Firefox: FAIL

**Workaround for Users**:
Both maps are fully functional and keyboard accessible. Screen reader users can navigate between them using standard landmark navigation, though they have identical labels.

---

## Visual Regression Tests

Visual regression test baseline screenshots need to be generated after color changes (cinnabar → old-rose). This is expected and not a bug.

**Action Required**: Run `npx playwright test --update-snapshots` to generate new baselines.
