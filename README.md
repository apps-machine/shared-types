# @apps-machine/shared-types

Shared Zod schemas and TypeScript types used across all [Apps Machine](https://github.com/apps-machine) OSS components — Selection Agent, Spec Agent, Build Agents, Localization, Compliance, Submission, Acquisition, Monitoring, Iteration.

## Install

```bash
bun add @apps-machine/shared-types
# or
npm install @apps-machine/shared-types
```

## Usage

```ts
import { RawAppDataSchema, type RawAppData } from "@apps-machine/shared-types";

const parsed: RawAppData = RawAppDataSchema.parse(unknownInput);
```

## Schemas

| Schema | Purpose |
|---|---|
| `RawAppDataSchema` | Output of scrapers (Apple App Store + Google Play); typed boundary between scraper layer and scoring layer. |
| `JudgeResultSchema` | Output of LLM judges (text + vision); persisted with `judgeKind` discriminator for parallel comparison. |

## Why this package?

Apps Machine is an open-core multi-repo project. Each component publishes independently to npm. Sharing Zod schemas via this package guarantees the contract between scrapers, judges, scorers, and the orchestrator stays in sync — change a schema once, every consumer sees the breakage at typecheck time.

## Development

```bash
bun install
bun run typecheck
bun test
```

Pre-commit: `git config core.hooksPath .githooks` (runs `gitleaks` if installed).

## License

MIT — see [LICENSE](./LICENSE).

## Related

- [`@apps-machine/selection-agent`](https://github.com/apps-machine/selection-agent) — first consumer
- [Apps Machine architecture](https://github.com/apps-machine) — org overview
