# @trooper/demo

The interactive Trooper product demo — the browser frame on the landing page
that plays a scripted reel and lets a visitor take over.

It lives outside the landing site so surfaces can be built while you're looking
at them. Running the whole Next app and waiting ~60s for the reel to reach the
beat you're working on is how the quality slipped in the first place.

## Develop

```
npm run dev -w @trooper/demo     # harness on :5173
```

- `/` — every workspace and scenario, one click away
- `/#/workspace/:name` — a single workspace mounted alone at its real size
  (720×520, the panel it gets inside the ticket). This is the fast path.
- `/#/scenario/:id` — the full reel with a speed control (0.25×–4×) and a
  scrubber that jumps straight to any beat

The "Motion on/off" toggle in the corner approximates `prefers-reduced-motion`.

## Use

```tsx
import { TrooperDemo } from '@trooper/demo';

<TrooperDemo rotate backdrop={<YourBackground />} />
```

The package owns none of its host's chrome — `backdrop` is a slot so the
landing can pass its dither gradient without the demo knowing about it.

## Layout

```
src/
  TrooperDemo.tsx    the reel: script runner, cursor, take-over mode
  components/        kanban, chat, ticket modal, artifact panel, canvas
  workspaces/        browser stream, video editor, desktop, generation, nodes
  scenarios/         22 scripted scenarios
  assets/            media and artifact helpers
  lib/               motion tokens, geometry, drag, cursor actions
harness/             dev app — not shipped
```
