<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Code rules

- never use any types
- never use undefined in type checking or conditional statements, stick to null if boolean values like &&
- never use interfaces, always prefer type declarations
- always use the @/ import alias when importing any file from anywhere

## Commit rules

- Use simple plain english conventional commits, e.g. "feat: XXX".
- The commit message explains what was done, not what you did — describe the change itself, not the actions taken to make it.
  - Good: "feat: add date input component"
  - Bad: "feat: I added a date input component"

## Pull request rules

- Titles follow the same plain english conventional commit style as commit messages, e.g. "feat: add date input component".
- Descriptions are written in simple plain english and explain what was done (the change itself), not what you did.
