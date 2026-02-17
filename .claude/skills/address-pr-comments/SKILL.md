---
allowed-tools: Skill(verify-code)
description: Read and handle comments on a PR
---

## Example Usage

```bash
/address-pr-comments 123 feature-branch "Type safety issues, error handling"
```

**Parameters:**
- `pr-num`: The GitHub pull request number (e.g., 123)
- `branch-name`: The git branch name for this PR (e.g., feature-branch)
- `focus-areas`: Specific areas to address from the PR feedback (e.g., "Type safety issues, error handling")

**Common Focus Areas:**
- Type safety issues
- Error handling
- Missing tests
- Performance concerns
- Accessibility improvements
- Security vulnerabilities
- Code duplication
- Documentation gaps

<context>
    <project_state>
        The project is currently on branch {{branch-name}}.
        Pull Request # {{pr-num}} has been opened and received feedback.
    </project_state>
    <focus_areas>
        {{focus-areas}}
    </focus_areas>
</context>

<purpose>
    Address only the issues listed in the <focus_areas> section above.
    Ignore all other issues for this session.
</purpose>

<instructions>
    <step>
        Check the detailed PR comments with `gh pr view {{pr-num}} --comments`.
        (If the `gh` CLI fails or is not authenticated, ask me to paste the comments manually).
    </step>

    <step>
        Analyze the <focus_areas> and create a prioritized list of the issues
        you plan to fix. Present this plan to me briefly before writing code.
    </step>

    <step>
        Iterate through the prioritized list one issue at a time using the <instruction_loop>.

        <instruction_loop>
            <fix>
                Implement the code changes required for the current issue.
            </fix>

            <verify>
                Use the verify-code skill to ensure TypeScript, formatting, and testing issues are identified and resolved. This ensures code quality and prevents accumulation of technical debt.
            </verify>

            <commit>
                Once <verify> passes, commit the changes.
                - Message Format: "fix: [brief description of the specific critical issue]"
                - Constraint: Do NOT use `--no-verify`.
            </commit>
        </instruction_loop>
    </step>

    <final_step>
        After all critical issues are committed:
        1. Stop and output a summary of the fixed items.
        2. Add a comment to the PR describing these changes.
        3. Ask if I am ready to proceed to other suggestions.
    </final_step>

</instructions>

<references>
    See `references/examples.md` for examples of common PR comments and how to address them.
    See `references/response-templates.md` for PR comment response templates.
    See `references/commit-messages.md` for commit message guidelines and examples.
</references>
