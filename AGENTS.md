# Repository Guidelines

## Project Structure & Module Organization
Astro source lives entirely in `src/`: `pages/` defines routes, `components/`/`layouts/` share UI, helpers sit in `lib/`, `utils/`, `plugins/`, and styles stay in `styles/`. MD/MDX posts belong in `src/content/posts` with kebab-case slugs while drafts keep a leading `_`; schema and metadata are controlled by `content.config.ts` and `src/config.ts`. Static assets go in `public/`, automation scripts in the root `scripts/` directory, production output in `dist/` (never committed), and the `@/` alias from `tsconfig.json` replaces long relative imports.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies via PNPM.
- `pnpm dev` — start the Astro dev server with HMR.
- `pnpm build` — run `scripts/toggle-proxy.ts` then emit the production site to `dist/`.
- `pnpm preview` — serve the built output locally to mirror Netlify.
- `pnpm lint` / `pnpm lint:fix` — ESLint for `.astro`, `.ts`, `.tsx`.
- `pnpm format:check` / `pnpm format` — Prettier + `prettier-plugin-astro`.
- `pnpm new` / `pnpm update-theme` — invoke the helper scripts in `scripts/`.

## Coding Style & Naming Conventions
The repo extends `astro/tsconfigs/strict`, so keep strict typing and avoid `any`. Prettier enforces 2-space indentation and single quotes; run `pnpm format` before pushing. Use PascalCase for components, camelCase for helpers, and kebab-case for content filenames, and only disable lint rules with an inline note.

## Testing Guidelines
There is no automated suite yet, so every PR must document manual verification (command, URL, expected behavior) and at least run `pnpm dev` or `pnpm preview` plus `pnpm lint`. When you add logic-heavy helpers, co-locate Vitest specs in `src/utils/__tests__` using `*.test.ts` names so coverage can grow incrementally.

## Commit & Pull Request Guidelines
Recent commits stick to short, imperative subjects with scopes (`Update essay.mdx`, `fixed: unable to load toc…`); keep them ≤72 characters and describe the “why” in the body if needed. PRs should link issues (or note `N/A`), summarize the change, list the commands you ran, and attach screenshots or diffs for UI/content edits. Call out config toggles (`linkCard`, proxy, theme) or migrations so reviewers know how deploys are affected.

## Content & Configuration Tips
Site metadata, feature flags, and theme knobs live in `src/config.ts`; mention SEO impacts when editing them. Use `pnpm new` to scaffold posts under `src/content/posts` instead of copying files. `scripts/toggle-proxy.ts` runs during `pnpm build` and may rename `src/pages/api/proxy.ts`, so verify the intended `linkCard` state and keep `netlify.toml` synced with the deployment you expect.
