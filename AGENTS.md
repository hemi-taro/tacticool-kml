# MSN Line Tool Development Guidelines

## AGENTS.md Maintenance

- Do not edit `AGENTS.md` without explicit user approval.
- When a recurring issue or newly established long-term project rule would benefit from documentation, propose an `AGENTS.md` update before editing it.
- Do not propose adding temporary decisions, individual feature requirements, or one-off fixes.
- Keep `AGENTS.md` concise and remove obsolete rules when proposing updates.

## Change Workflow

When the user requests a feature or modification:

1. Do not immediately edit files.
2. Summarize the requested changes.
3. Propose the next version number.
4. Explain implementation details, affected behavior, limitations, and unresolved decisions.
5. State what will remain unchanged.
6. Wait for explicit user approval before editing code.
7. After approval, implement, test, and update `SPEC.md` and `CHANGELOG.md`.

Bug investigation and read-only file inspection may be performed before approval.

## Project Priorities

1. Coordinate calculation and KML correctness
2. iPhone/iPad Safari usability
3. Simple UI
4. Fully offline operation
5. Single `index.html`
6. No external libraries

## Documentation

- `SPEC.md`: Current confirmed application behavior
- `CHANGELOG.md`: Completed changes only
- `docs/superpowers/`: Temporary implementation plans and design records