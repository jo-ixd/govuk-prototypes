<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Code rules

- never use any types
- never use undefined in type checking or conditional statements, stick to null if boolean values like &&
- always use the @/ import alias when importing any file from anywhere
