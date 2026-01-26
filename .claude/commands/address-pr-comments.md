---
argument-hint: [pr-num] [branch-name] [focus-areas]
allowed-tools: Skill(verify-code)
description: Read and handle comments on a PR
---

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
