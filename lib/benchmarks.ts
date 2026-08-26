export type HarnessId = 'Trooper' | 'Claude Code' | 'Codex' | 'Hermes';

export const HARNESSES: HarnessId[] = ['Trooper', 'Claude Code', 'Codex', 'Hermes'];

export type PairRow = {
  id: string;
  harness: HarnessId;
  model: string;
  elo: number;
  winRate: number;
  cost: number;
  light: number;
  heavy: number;
  time: string;
  tasks: number;
};

export type OverallRow = PairRow & {
  delta: number;
  delivery: number;
  slow: string;
};

export type CategoryId =
  | 'coding'
  | 'research'
  | 'support'
  | 'marketing'
  | 'sales'
  | 'email'
  | 'data'
  | 'content'
  | 'seo'
  | 'management';

export const BENCHMARK_META = {
  lastRun: '2026-08-07',
  from: '2026-05-06',
  to: '2026-08-06',
  tasks: 42107,
  spend: 142942,
  significantAgents: 6,
  totalAgents: 10,
  significantFloor: 500,
} as const;

export const OVERALL_ROWS: OverallRow[] = [
    { id: 'claude-code-claude-fable-5', harness: 'Claude Code', model: 'Claude Fable 5', elo: 1201, delta: 0, winRate: 60.6, delivery: 97.5, cost: 4.86, light: 2.14, heavy: 17, time: '6m 57s', slow: '15m 18s', tasks: 4240 },
    { id: 'codex-gpt-5.6-sol', harness: 'Codex', model: 'GPT-5.6 Sol', elo: 1185, delta: -15, winRate: 58.4, delivery: 96.6, cost: 1.88, light: 0.83, heavy: 6.4, time: '5m 54s', slow: '13m', tasks: 2188 },
    { id: 'claude-code-claude-opus-5', harness: 'Claude Code', model: 'Claude Opus 5', elo: 1170, delta: -21, winRate: 56.2, delivery: 95.6, cost: 3.63, light: 1.6, heavy: 12, time: '7m 40s', slow: '16m 52s', tasks: 1458 },
    { id: 'trooper-chatgpt-luna', harness: 'Trooper', model: 'ChatGPT Luna', elo: 1142, delta: 8, winRate: 51.8, delivery: 94.1, cost: 1.42, light: 0.62, heavy: 4.88, time: '5m 12s', slow: '11m 40s', tasks: 860 },
    { id: 'claude-code-claude-opus-4-8', harness: 'Claude Code', model: 'Claude Opus 4.8', elo: 1130, delta: 18, winRate: 50.5, delivery: 93.5, cost: 2.2, light: 0.97, heavy: 7.48, time: '5m 54s', slow: '12m 59s', tasks: 754 },
    { id: 'hermes-deepseek-v4-pro', harness: 'Hermes', model: 'DeepSeek V4 Pro', elo: 1104, delta: -21, winRate: 46.8, delivery: 92.9, cost: 0.53, light: 0.23, heavy: 1.79, time: '6m 10s', slow: '13m 33s', tasks: 615 },
    { id: 'trooper-deepseek-v4-flash', harness: 'Trooper', model: 'DeepSeek V4 Flash', elo: 1096, delta: 12, winRate: 45.4, delivery: 92.2, cost: 0.11, light: 0.05, heavy: 0.38, time: '2m 18s', slow: '5m 4s', tasks: 412 },
    { id: 'claude-code-claude-sonnet-4-6', harness: 'Claude Code', model: 'Claude Sonnet 4.6', elo: 1090, delta: 3, winRate: 44.8, delivery: 91.8, cost: 1.52, light: 0.67, heavy: 5.18, time: '5m 26s', slow: '11m 57s', tasks: 492 },
    { id: 'hermes-deepseek-v4-flash', harness: 'Hermes', model: 'DeepSeek V4 Flash', elo: 1068, delta: -6, winRate: 41.7, delivery: 91.0, cost: 0.14, light: 0.06, heavy: 0.49, time: '2m 29s', slow: '5m 29s', tasks: 90 },
    { id: 'hermes-kimi-k3', harness: 'Hermes', model: 'Kimi K3', elo: 1063, delta: -6, winRate: 41.0, delivery: 90.5, cost: 2.26, light: 1.0, heavy: 7.69, time: '10m 26s', slow: '22m 57s', tasks: 316 },
];

export const CATEGORIES: {
  id: CategoryId;
  title: string;
  blurb: string;
  tasks: number;
  rows: PairRow[];
}[] = [
  {
    id: 'coding',
    title: 'Coding',
    blurb: 'Software tasks — features, fixes, deploys',
    tasks: 3029,
    rows: [
      { id: 'claude-code-claude-fable-5', harness: 'Claude Code', model: 'Claude Fable 5', elo: 1208, winRate: 60.8, time: '8m 38s', tasks: 1152, light: 2.87, cost: 7.91, heavy: 23 },
      { id: 'codex-gpt-5-6-sol', harness: 'Codex', model: 'GPT-5.6 Sol', elo: 1186, winRate: 57.7, time: '6m 48s', tasks: 595, light: 1.12, cost: 2.91, heavy: 9.03 },
      { id: 'claude-code-claude-opus-5', harness: 'Claude Code', model: 'Claude Opus 5', elo: 1181, winRate: 57.0, time: '9m 58s', tasks: 475, light: 2.35, cost: 5.87, heavy: 19 },
      { id: 'trooper-chatgpt-luna', harness: 'Trooper', model: 'ChatGPT Luna', elo: 1148, winRate: 52.4, time: '6m 10s', tasks: 96, light: 0.84, cost: 2.05, heavy: 6.4 },
      { id: 'claude-code-claude-opus-4-8', harness: 'Claude Code', model: 'Claude Opus 4.8', elo: 1134, winRate: 50.3, time: '7m 21s', tasks: 216, light: 1.45, cost: 3.53, heavy: 12 },
      { id: 'claude-code-claude-sonnet-4-6', harness: 'Claude Code', model: 'Claude Sonnet 4.6', elo: 1091, winRate: 44.2, time: '6m 45s', tasks: 210, light: 0.93, cost: 2.23, heavy: 7.54 },
      { id: 'trooper-deepseek-v4-flash', harness: 'Trooper', model: 'DeepSeek V4 Flash', elo: 1082, winRate: 42.8, time: '3m 12s', tasks: 38, light: 0.08, cost: 0.18, heavy: 0.61 },
      { id: 'hermes-deepseek-v4-pro', harness: 'Hermes', model: 'DeepSeek V4 Pro', elo: 1072, winRate: 41.5, time: '7m 19s', tasks: 119, light: 0.4, cost: 0.87, heavy: 3.24 },
      { id: 'hermes-kimi-k3', harness: 'Hermes', model: 'Kimi K3', elo: 1050, winRate: 38.5, time: '11m 52s', tasks: 128, light: 1.53, cost: 3.13, heavy: 13 },
    ],
  },
  {
    id: 'research',
    title: 'Research',
    blurb: 'Deep dives, competitive analysis, reports',
    tasks: 1451,
    rows: [
      { id: 'claude-code-claude-fable-5', harness: 'Claude Code', model: 'Claude Fable 5', elo: 1196, winRate: 58.7, time: '9m 46s', tasks: 502, light: 1.95, cost: 5.22, heavy: 16 },
      { id: 'codex-gpt-5-6-sol', harness: 'Codex', model: 'GPT-5.6 Sol', elo: 1186, winRate: 57.3, time: '9m 26s', tasks: 388, light: 0.86, cost: 2.26, heavy: 6.89 },
      { id: 'claude-code-claude-opus-5', harness: 'Claude Code', model: 'Claude Opus 5', elo: 1166, winRate: 54.4, time: '10m 38s', tasks: 185, light: 1.71, cost: 3.69, heavy: 14 },
      { id: 'trooper-chatgpt-luna', harness: 'Trooper', model: 'ChatGPT Luna', elo: 1136, winRate: 50.2, time: '8m 4s', tasks: 48, light: 0.71, cost: 1.68, heavy: 5.4 },
      { id: 'hermes-deepseek-v4-pro', harness: 'Hermes', model: 'DeepSeek V4 Pro', elo: 1119, winRate: 47.7, time: '9m 17s', tasks: 131, light: 0.27, cost: 0.63, heavy: 2.23 },
      { id: 'claude-code-claude-opus-4-8', harness: 'Claude Code', model: 'Claude Opus 4.8', elo: 1119, winRate: 47.7, time: '8m 23s', tasks: 72, light: 0.88, cost: 2.35, heavy: 7.07 },
      { id: 'hermes-kimi-k3', harness: 'Hermes', model: 'Kimi K3', elo: 1081, winRate: 42.3, time: '12m 37s', tasks: 66, light: 0.83, cost: 1.96, heavy: 6.72 },
      { id: 'claude-code-claude-sonnet-4-6', harness: 'Claude Code', model: 'Claude Sonnet 4.6', elo: 1079, winRate: 42.0, time: '6m 52s', tasks: 37, light: 0.55, cost: 1.35, heavy: 4.46 },
      { id: 'trooper-deepseek-v4-flash', harness: 'Trooper', model: 'DeepSeek V4 Flash', elo: 1074, winRate: 41.6, time: '4m 8s', tasks: 22, light: 0.07, cost: 0.16, heavy: 0.52 },
    ],
  },
  {
    id: 'support',
    title: 'Customer support',
    blurb: 'Inbound questions answered end to end',
    tasks: 914,
    rows: [
      { id: 'claude-code-claude-fable-5', harness: 'Claude Code', model: 'Claude Fable 5', elo: 1185, winRate: 57.8, time: '4m 32s', tasks: 342, light: 1.19, cost: 2.64, heavy: 9.7 },
      { id: 'codex-gpt-5-6-sol', harness: 'Codex', model: 'GPT-5.6 Sol', elo: 1177, winRate: 56.7, time: '3m 36s', tasks: 179, light: 0.45, cost: 0.98, heavy: 3.71 },
      { id: 'claude-code-claude-opus-5', harness: 'Claude Code', model: 'Claude Opus 5', elo: 1154, winRate: 53.4, time: '4m 36s', tasks: 109, light: 0.64, cost: 1.77, heavy: 5.13 },
      { id: 'trooper-chatgpt-luna', harness: 'Trooper', model: 'ChatGPT Luna', elo: 1140, winRate: 51.1, time: '3m 28s', tasks: 41, light: 0.38, cost: 0.92, heavy: 2.9 },
      { id: 'claude-code-claude-opus-4-8', harness: 'Claude Code', model: 'Claude Opus 4.8', elo: 1123, winRate: 49.0, time: '4m 10s', tasks: 57, light: 0.57, cost: 1.25, heavy: 4.7 },
      { id: 'hermes-deepseek-v4-pro', harness: 'Hermes', model: 'DeepSeek V4 Pro', elo: 1113, winRate: 47.5, time: '4m 19s', tasks: 89, light: 0.12, cost: 0.32, heavy: 0.97 },
      { id: 'claude-code-claude-sonnet-4-6', harness: 'Claude Code', model: 'Claude Sonnet 4.6', elo: 1102, winRate: 45.9, time: '3m 43s', tasks: 45, light: 0.27, cost: 0.77, heavy: 2.18 },
      { id: 'trooper-deepseek-v4-flash', harness: 'Trooper', model: 'DeepSeek V4 Flash', elo: 1078, winRate: 42.1, time: '2m 8s', tasks: 28, light: 0.05, cost: 0.12, heavy: 0.41 },
      { id: 'hermes-deepseek-v4-flash', harness: 'Hermes', model: 'DeepSeek V4 Flash', elo: 1058, winRate: 39.7, time: '2m 36s', tasks: 24, light: 0.07, cost: 0.15, heavy: 0.59 },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing',
    blurb: 'Campaigns, positioning, launch plans',
    tasks: 838,
    rows: [
      { id: 'claude-code-claude-fable-5', harness: 'Claude Code', model: 'Claude Fable 5', elo: 1205, winRate: 59.8, time: '7m 33s', tasks: 322, light: 1.78, cost: 4.3, heavy: 14 },
      { id: 'codex-gpt-5-6-sol', harness: 'Codex', model: 'GPT-5.6 Sol', elo: 1182, winRate: 56.6, time: '5m 48s', tasks: 157, light: 0.57, cost: 1.55, heavy: 4.57 },
      { id: 'claude-code-claude-opus-5', harness: 'Claude Code', model: 'Claude Opus 5', elo: 1174, winRate: 55.4, time: '8m 24s', tasks: 120, light: 1.35, cost: 3.1, heavy: 11 },
      { id: 'trooper-chatgpt-luna', harness: 'Trooper', model: 'ChatGPT Luna', elo: 1138, winRate: 50.6, time: '5m 22s', tasks: 42, light: 0.48, cost: 1.18, heavy: 3.7 },
      { id: 'claude-code-claude-opus-4-8', harness: 'Claude Code', model: 'Claude Opus 4.8', elo: 1124, winRate: 48.3, time: '6m 21s', tasks: 59, light: 0.82, cost: 1.9, heavy: 6.63 },
      { id: 'hermes-deepseek-v4-pro', harness: 'Hermes', model: 'DeepSeek V4 Pro', elo: 1110, winRate: 46.2, time: '6m 47s', tasks: 55, light: 0.19, cost: 0.5, heavy: 1.55 },
      { id: 'claude-code-claude-sonnet-4-6', harness: 'Claude Code', model: 'Claude Sonnet 4.6', elo: 1087, winRate: 43.0, time: '5m 29s', tasks: 33, light: 0.55, cost: 1.14, heavy: 4.49 },
      { id: 'trooper-deepseek-v4-flash', harness: 'Trooper', model: 'DeepSeek V4 Flash', elo: 1076, winRate: 41.4, time: '3m 2s', tasks: 24, light: 0.06, cost: 0.14, heavy: 0.48 },
      { id: 'hermes-kimi-k3', harness: 'Hermes', model: 'Kimi K3', elo: 1071, winRate: 40.7, time: '8m 56s', tasks: 26, light: 0.69, cost: 1.51, heavy: 5.67 },
    ],
  },
  {
    id: 'sales',
    title: 'Sales',
    blurb: 'Prospecting, outreach, and pipeline upkeep',
    tasks: 669,
    rows: [
      { id: 'claude-code-claude-fable-5', harness: 'Claude Code', model: 'Claude Fable 5', elo: 1209, winRate: 60.6, time: '7m 12s', tasks: 283, light: 1.53, cost: 4.36, heavy: 12 },
      { id: 'codex-gpt-5-6-sol', harness: 'Codex', model: 'GPT-5.6 Sol', elo: 1190, winRate: 57.9, time: '5m 13s', tasks: 124, light: 0.55, cost: 1.5, heavy: 4.43 },
      { id: 'claude-code-claude-opus-5', harness: 'Claude Code', model: 'Claude Opus 5', elo: 1170, winRate: 55.1, time: '6m 37s', tasks: 73, light: 1.1, cost: 2.69, heavy: 8.9 },
      { id: 'trooper-chatgpt-luna', harness: 'Trooper', model: 'ChatGPT Luna', elo: 1144, winRate: 51.6, time: '4m 48s', tasks: 42, light: 0.44, cost: 1.12, heavy: 3.4 },
      { id: 'claude-code-claude-opus-4-8', harness: 'Claude Code', model: 'Claude Opus 4.8', elo: 1131, winRate: 49.5, time: '5m 52s', tasks: 49, light: 0.67, cost: 1.88, heavy: 5.38 },
      { id: 'hermes-deepseek-v4-pro', harness: 'Hermes', model: 'DeepSeek V4 Pro', elo: 1099, winRate: 44.9, time: '4m 42s', tasks: 26, light: 0.15, cost: 0.39, heavy: 1.19 },
      { id: 'claude-code-claude-sonnet-4-6', harness: 'Claude Code', model: 'Claude Sonnet 4.6', elo: 1083, winRate: 42.7, time: '3m 55s', tasks: 24, light: 0.39, cost: 0.92, heavy: 3.14 },
      { id: 'trooper-deepseek-v4-flash', harness: 'Trooper', model: 'DeepSeek V4 Flash', elo: 1070, winRate: 40.8, time: '2m 41s', tasks: 24, light: 0.05, cost: 0.13, heavy: 0.44 },
      { id: 'hermes-kimi-k3', harness: 'Hermes', model: 'Kimi K3', elo: 1059, winRate: 39.3, time: '6m 46s', tasks: 24, light: 0.55, cost: 1.27, heavy: 4.47 },
    ],
  },
  {
    id: 'email',
    title: 'Email & inbox',
    blurb: 'Triage, replies, and follow-ups on real inboxes',
    tasks: 2335,
    rows: [
      { id: 'claude-code-claude-fable-5', harness: 'Claude Code', model: 'Claude Fable 5', elo: 1198, winRate: 58.9, time: '4m 30s', tasks: 1067, light: 1.12, cost: 2.53, heavy: 9.14 },
      { id: 'codex-gpt-5-6-sol', harness: 'Codex', model: 'GPT-5.6 Sol', elo: 1184, winRate: 57.0, time: '3m 15s', tasks: 467, light: 0.3, cost: 0.87, heavy: 2.42 },
      { id: 'claude-code-claude-opus-5', harness: 'Claude Code', model: 'Claude Opus 5', elo: 1162, winRate: 53.8, time: '4m 8s', tasks: 277, light: 0.61, cost: 1.56, heavy: 4.88 },
      { id: 'trooper-chatgpt-luna', harness: 'Trooper', model: 'ChatGPT Luna', elo: 1141, winRate: 51.4, time: '3m 6s', tasks: 79, light: 0.28, cost: 0.72, heavy: 2.2 },
      { id: 'claude-code-claude-opus-4-8', harness: 'Claude Code', model: 'Claude Opus 4.8', elo: 1134, winRate: 49.8, time: '3m 39s', tasks: 183, light: 0.54, cost: 1.09, heavy: 4.45 },
      { id: 'hermes-deepseek-v4-pro', harness: 'Hermes', model: 'DeepSeek V4 Pro', elo: 1106, winRate: 45.8, time: '2m 57s', tasks: 99, light: 0.08, cost: 0.23, heavy: 0.66 },
      { id: 'claude-code-claude-sonnet-4-6', harness: 'Claude Code', model: 'Claude Sonnet 4.6', elo: 1092, winRate: 43.8, time: '2m 27s', tasks: 63, light: 0.21, cost: 0.53, heavy: 1.72 },
      { id: 'trooper-deepseek-v4-flash', harness: 'Trooper', model: 'DeepSeek V4 Flash', elo: 1084, winRate: 42.6, time: '2m 2s', tasks: 34, light: 0.04, cost: 0.1, heavy: 0.34 },
      { id: 'hermes-deepseek-v4-flash', harness: 'Hermes', model: 'DeepSeek V4 Flash', elo: 1071, winRate: 40.9, time: '2m 27s', tasks: 66, light: 0.06, cost: 0.14, heavy: 0.45 },
    ],
  },
  {
    id: 'data',
    title: 'Data & analytics',
    blurb: 'Queries, dashboards, number-crunching',
    tasks: 629,
    rows: [
      { id: 'claude-code-claude-fable-5', harness: 'Claude Code', model: 'Claude Fable 5', elo: 1198, winRate: 59.4, time: '5m 49s', tasks: 210, light: 2.19, cost: 4.38, heavy: 12 },
      { id: 'codex-gpt-5-6-sol', harness: 'Codex', model: 'GPT-5.6 Sol', elo: 1195, winRate: 59.0, time: '5m 40s', tasks: 167, light: 0.9, cost: 1.91, heavy: 7.36 },
      { id: 'claude-code-claude-opus-5', harness: 'Claude Code', model: 'Claude Opus 5', elo: 1161, winRate: 54.2, time: '5m 29s', tasks: 57, light: 1.33, cost: 2.76, heavy: 11 },
      { id: 'trooper-chatgpt-luna', harness: 'Trooper', model: 'ChatGPT Luna', elo: 1146, winRate: 52.0, time: '4m 51s', tasks: 42, light: 0.68, cost: 1.44, heavy: 4.8 },
      { id: 'claude-code-claude-opus-4-8', harness: 'Claude Code', model: 'Claude Opus 4.8', elo: 1126, winRate: 49.1, time: '5m 6s', tasks: 42, light: 0.96, cost: 2.0, heavy: 7.88 },
      { id: 'hermes-deepseek-v4-pro', harness: 'Hermes', model: 'DeepSeek V4 Pro', elo: 1093, winRate: 44.4, time: '4m 49s', tasks: 31, light: 0.18, cost: 0.47, heavy: 1.48 },
      { id: 'claude-code-claude-sonnet-4-6', harness: 'Claude Code', model: 'Claude Sonnet 4.6', elo: 1093, winRate: 44.4, time: '5m 2s', tasks: 32, light: 0.51, cost: 1.34, heavy: 4.09 },
      { id: 'trooper-deepseek-v4-flash', harness: 'Trooper', model: 'DeepSeek V4 Flash', elo: 1075, winRate: 41.8, time: '2m 55s', tasks: 24, light: 0.06, cost: 0.15, heavy: 0.5 },
      { id: 'hermes-kimi-k3', harness: 'Hermes', model: 'Kimi K3', elo: 1058, winRate: 39.5, time: '7m 5s', tasks: 24, light: 0.66, cost: 1.57, heavy: 5.36 },
    ],
  },
  {
    id: 'content',
    title: 'Content writing',
    blurb: 'Articles, docs, and copy',
    tasks: 589,
    rows: [
      { id: 'claude-code-claude-fable-5', harness: 'Claude Code', model: 'Claude Fable 5', elo: 1204, winRate: 59.5, time: '4m 39s', tasks: 208, light: 1.65, cost: 3.56, heavy: 13 },
      { id: 'codex-gpt-5-6-sol', harness: 'Codex', model: 'GPT-5.6 Sol', elo: 1176, winRate: 55.5, time: '3m 41s', tasks: 63, light: 0.63, cost: 1.32, heavy: 5.15 },
      { id: 'claude-code-claude-opus-5', harness: 'Claude Code', model: 'Claude Opus 5', elo: 1166, winRate: 54.1, time: '4m 44s', tasks: 117, light: 0.89, cost: 2.38, heavy: 7.18 },
      { id: 'trooper-chatgpt-luna', harness: 'Trooper', model: 'ChatGPT Luna', elo: 1139, winRate: 50.8, time: '3m 33s', tasks: 42, light: 0.46, cost: 1.08, heavy: 3.6 },
      { id: 'claude-code-claude-opus-4-8', harness: 'Claude Code', model: 'Claude Opus 4.8', elo: 1128, winRate: 48.6, time: '4m 17s', tasks: 46, light: 0.8, cost: 1.69, heavy: 6.55 },
      { id: 'hermes-deepseek-v4-pro', harness: 'Hermes', model: 'DeepSeek V4 Pro', elo: 1115, winRate: 46.8, time: '4m 26s', tasks: 41, light: 0.17, cost: 0.43, heavy: 1.36 },
      { id: 'claude-code-claude-sonnet-4-6', harness: 'Claude Code', model: 'Claude Sonnet 4.6', elo: 1091, winRate: 43.4, time: '3m 31s', tasks: 24, light: 0.36, cost: 0.98, heavy: 2.88 },
      { id: 'hermes-kimi-k3', harness: 'Hermes', model: 'Kimi K3', elo: 1082, winRate: 42.1, time: '6m 21s', tasks: 24, light: 0.55, cost: 1.4, heavy: 4.46 },
      { id: 'trooper-deepseek-v4-flash', harness: 'Trooper', model: 'DeepSeek V4 Flash', elo: 1073, winRate: 41.2, time: '2m 18s', tasks: 24, light: 0.05, cost: 0.13, heavy: 0.42 },
    ],
  },
  {
    id: 'seo',
    title: 'SEO',
    blurb: 'Rankings, audits, and site optimization',
    tasks: 415,
    rows: [
      { id: 'claude-code-claude-fable-5', harness: 'Claude Code', model: 'Claude Fable 5', elo: 1204, winRate: 59.7, time: '10m 41s', tasks: 154, light: 2.91, cost: 6.57, heavy: 24 },
      { id: 'codex-gpt-5-6-sol', harness: 'Codex', model: 'GPT-5.6 Sol', elo: 1176, winRate: 55.8, time: '6m 36s', tasks: 48, light: 0.82, cost: 1.99, heavy: 6.67 },
      { id: 'claude-code-claude-opus-5', harness: 'Claude Code', model: 'Claude Opus 5', elo: 1170, winRate: 55.0, time: '10m 27s', tasks: 45, light: 1.89, cost: 4.27, heavy: 15 },
      { id: 'trooper-chatgpt-luna', harness: 'Trooper', model: 'ChatGPT Luna', elo: 1143, winRate: 51.3, time: '7m 12s', tasks: 42, light: 0.72, cost: 1.66, heavy: 5.2 },
      { id: 'claude-code-claude-opus-4-8', harness: 'Claude Code', model: 'Claude Opus 4.8', elo: 1138, winRate: 50.4, time: '9m 16s', tasks: 30, light: 1.38, cost: 2.98, heavy: 11 },
      { id: 'hermes-deepseek-v4-pro', harness: 'Hermes', model: 'DeepSeek V4 Pro', elo: 1116, winRate: 47.2, time: '8m 18s', tasks: 24, light: 0.31, cost: 0.68, heavy: 2.56 },
      { id: 'claude-code-claude-sonnet-4-6', harness: 'Claude Code', model: 'Claude Sonnet 4.6', elo: 1085, winRate: 42.8, time: '6m 35s', tasks: 24, light: 0.63, cost: 1.53, heavy: 5.08 },
      { id: 'trooper-deepseek-v4-flash', harness: 'Trooper', model: 'DeepSeek V4 Flash', elo: 1071, winRate: 40.6, time: '4m 22s', tasks: 24, light: 0.08, cost: 0.19, heavy: 0.64 },
      { id: 'hermes-kimi-k3', harness: 'Hermes', model: 'Kimi K3', elo: 1059, winRate: 39.2, time: '9m 27s', tasks: 24, light: 0.63, cost: 1.83, heavy: 5.0 },
    ],
  },
  {
    id: 'management',
    title: 'Management & coordination',
    blurb: 'Delegation, scheduling, and follow-through',
    tasks: 31334,
    rows: [
      { id: 'claude-code-claude-fable-5', harness: 'Claude Code', model: 'Claude Fable 5', elo: 1192, winRate: 56.7, time: '2m 54s', tasks: 14520, light: 1.32, cost: 2.75, heavy: 11 },
      { id: 'codex-gpt-5-6-sol', harness: 'Codex', model: 'GPT-5.6 Sol', elo: 1173, winRate: 54.0, time: '2m 1s', tasks: 5708, light: 0.35, cost: 0.91, heavy: 2.81 },
      { id: 'claude-code-claude-opus-5', harness: 'Claude Code', model: 'Claude Opus 5', elo: 1160, winRate: 52.1, time: '2m 51s', tasks: 4262, light: 0.88, cost: 1.79, heavy: 7.25 },
      { id: 'claude-code-claude-opus-4-8', harness: 'Claude Code', model: 'Claude Opus 4.8', elo: 1137, winRate: 48.8, time: '2m 31s', tasks: 2787, light: 0.55, cost: 1.24, heavy: 4.47 },
      { id: 'trooper-chatgpt-luna', harness: 'Trooper', model: 'ChatGPT Luna', elo: 1134, winRate: 49.6, time: '2m 8s', tasks: 386, light: 0.32, cost: 0.78, heavy: 2.4 },
      { id: 'hermes-deepseek-v4-pro', harness: 'Hermes', model: 'DeepSeek V4 Pro', elo: 1109, winRate: 44.8, time: '2m 12s', tasks: 1759, light: 0.12, cost: 0.28, heavy: 0.99 },
      { id: 'claude-code-claude-sonnet-4-6', harness: 'Claude Code', model: 'Claude Sonnet 4.6', elo: 1100, winRate: 43.5, time: '2m 13s', tasks: 1646, light: 0.28, cost: 0.76, heavy: 2.27 },
      { id: 'trooper-deepseek-v4-flash', harness: 'Trooper', model: 'DeepSeek V4 Flash', elo: 1088, winRate: 42.2, time: '1m 41s', tasks: 266, light: 0.04, cost: 0.09, heavy: 0.31 },
    ],
  },
];

export const PROVISIONAL_TASKS = 250;

export const HARNESS_COLOR: Record<HarnessId, string> = {
  Trooper: '#059669',
  'Claude Code': '#E8590C',
  Codex: '#202123',
  Hermes: '#171717',
};

export function formatUsd(n: number) {
  if (n >= 10 && Math.abs(n - Math.round(n)) < 0.05) return `$${Math.round(n)}`;
  if (n < 1) return `$${n.toFixed(2)}`;
  return `$${n.toFixed(2)}`;
}

export function formatCount(n: number) {
  return n.toLocaleString('en-US');
}

export function formatElo(n: number) {
  return n.toLocaleString('en-US');
}

export function timeToSeconds(time: string) {
  const m = time.match(/(\d+)m(?:\s+(\d+)s)?/);
  if (!m) return 0;
  return Number(m[1]) * 60 + Number(m[2] || 0);
}

export function paretoFrontier<T extends { elo: number; cost: number }>(rows: T[]) {
  const sorted = [...rows].sort((a, b) => a.cost - b.cost || b.elo - a.elo);
  const front: T[] = [];
  let bestElo = -Infinity;
  for (const row of sorted) {
    if (row.elo > bestElo) {
      front.push(row);
      bestElo = row.elo;
    }
  }
  return front;
}

export function aggregateByHarness(rows: OverallRow[]) {
  const groups = new Map<HarnessId, OverallRow[]>();
  for (const row of rows) {
    const list = groups.get(row.harness) ?? [];
    list.push(row);
    groups.set(row.harness, list);
  }
  return Array.from(groups.entries())
    .map(([harness, list]) => {
      const tasks = list.reduce((sum: number, row: OverallRow) => sum + row.tasks, 0);
      const elo = list.reduce((sum: number, row: OverallRow) => sum + row.elo * row.tasks, 0) / tasks;
      const cost = list.reduce((sum: number, row: OverallRow) => sum + row.cost * row.tasks, 0) / tasks;
      const winRate = list.reduce((sum: number, row: OverallRow) => sum + row.winRate * row.tasks, 0) / tasks;
      const best = [...list].sort((a, b) => b.elo - a.elo)[0];
      return { harness, elo, cost, winRate, tasks, models: list.length, bestModel: best.model };
    })
    .sort((a, b) => b.elo - a.elo);
}

export function aggregateByModel(rows: OverallRow[]) {
  return [...rows]
    .sort((a, b) => b.elo - a.elo)
    .map((row) => ({
      model: row.model,
      harness: row.harness,
      elo: row.elo,
      cost: row.cost,
      winRate: row.winRate,
      tasks: row.tasks,
      time: row.time,
    }));
}

export const FAQ_ITEMS = [
  {
    q: 'Where does this data come from?',
    a: 'From real usage on Trooper: tasks that users\' agents ran in production over the snapshot window, aggregated per harness + model pair. Pairs that are still accumulating volume are marked provisional and carry modeled estimates calibrated to adjacent measurements.',
  },
  {
    q: 'What does the Elo rating mean?',
    a: 'Pairs are compared head-to-head on comparable work — same task category, same period — and the better outcome wins the matchup. Ratings center on 1000, so a 40-point gap is a clear edge and a 10-point gap is noise.',
  },
  {
    q: 'Does the #1 pair overall mean it is the best choice for me?',
    a: 'Not necessarily. The overall board rewards quality across every kind of work; the per-category boards are the better guide, and the cost and time columns matter as much as the rating — a pair a few points lower at a tenth of the cost is often the right call.',
  },
  {
    q: 'Why is a harness or model missing?',
    a: 'Rows need at least 20 tasks in a category to appear at all. Newly added models and harnesses show up as provisional first and graduate once they cross 250 tasks. Trooper × DeepSeek V4 Flash and Trooper × ChatGPT Luna are included in this snapshot.',
  },
  {
    q: 'How often do the rankings update?',
    a: 'The leaderboard is a snapshot, refreshed periodically from production data — the current snapshot date is shown at the top of the page.',
  },
] as const;

