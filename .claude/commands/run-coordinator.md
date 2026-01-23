---
description: Execute spec files from a coordinator file sequentially using subagents
argument-hint: [coordinator-file]
---

<objective>
Process a COORDINATOR_FILE that contains a list of SPEC_FILES and execute each one sequentially with Claude Code.

This command orchestrates the implementation of a multi-task plan by processing each spec file in a subagent, waiting for completion, and collecting status notes before proceeding to the next task.
</objective>

<context>

Coordinator file to process: @$arguments

The coordinator file contains a table with spec file paths in the format:

| Task | File                 | Status      | Dependencies | Can Run In Parallel With |
| ---- | -------------------- | ----------- | ------------ | ------------------------ |
| 01   | .specs/example-01.md | Not Started | None         | 02, 03                   |

</context>

<process>

1. **Parse the Coordinator File**

    - Read the coordinator file specified by the user
    - Extract all spec file paths from the "File" column of the task table
    - Note which tasks are already marked as "Complete" (skip these)
    - Respect dependency order (tasks with dependencies should run after their prerequisites)

2. **For Each Spec File (Sequential Execution)**

    Execute these steps for each spec file that is NOT already complete:

    a. **Announce the Task**

    - Display which task number and spec file is being started
    - Show any relevant dependencies or prerequisites

    b. **Spawn a Claude Code Subagent**

    - Spawn a new Claude Code subagent to process the task
    - Pass any relevant summarized context to the subagent

    c. **Wait for Task Completion**

    - Monitor the subagent for completion
    - Determine completion status: success, partial, or failed
    - Summarize relevant notes to be passed to the next subagent
    - Document any issues, blockers, or important details
    - Update progress tracking in the Coordinator File

    d. **Proceed to Next Task**

    - Move to the next incomplete spec file
    - Repeat steps a-c

3. **Completion Summary**

    After all tasks have been processed:

    - Display a summary of completed tasks
    - List any tasks that failed or were skipped
    - Note any follow-up actions required

</process>

<constraints>

-   Execute tasks SEQUENTIALLY, not in parallel
-   SKIP tasks already marked as "Complete" in the coordinator file
-   Respect dependency order (check "Dependencies" column)
-   Do NOT proceed to dependent tasks until prerequisites are complete

</constraints>

<success_criteria>

-   All spec files from the coordinator file have been processed
-   Each task was executed in a Claude Code subagent
-   Completion notes collected for all tasks
-   Dependent tasks only ran after prerequisites completed
-   Final summary provided showing overall progress

</success_criteria>
