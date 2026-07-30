import { useEffect, useMemo, useState } from 'react';
import TrooperDemo from '@demo/TrooperDemo';
import { DEMO_KEYFRAMES } from '@demo/lib/demoMotion';
import { getDemoScenario, HERO_SCENARIO_ROTATION } from '@demo/scenarios/index';
import type { DemoScenarioId } from '@demo/scenarios/types';
import { DemoBrowserStream } from '@demo/workspaces/DemoBrowserStream';
import { DemoVideoWorkspace } from '@demo/workspaces/DemoVideoWorkspace';
import { DemoDesktopWorkspace } from '@demo/workspaces/DemoDesktopWorkspace';
import { DemoGenerationCard } from '@demo/workspaces/DemoGenerationCard';
import { DemoNodeGraph } from '@demo/workspaces/DemoNodeGraph';
import { FIXTURES, type WorkspaceKey } from './fixtures';
import { Chrome, Row, Toolbar, Field, Btn } from './ui';

const ALL_SCENARIOS: DemoScenarioId[] = [
  'launch', 'browser-work', 'video-edit', 'device-work',
  'coding', 'marketing', 'sales', 'legal', 'engineering', 'operations',
  'slack', 'whatsapp', 'messaging', 'email', 'design', 'support',
  'finance', 'bd', 'research', 'security', 'pr', 'growth',
];

/** Hash routing — a router dependency isn't worth it for three views. */
function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash.slice(1) || '/');
  useEffect(() => {
    const on = () => setHash(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return hash;
}

function go(path: string) {
  window.location.hash = path;
}

function Picker() {
  return (
    <div style={{ padding: 28, maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>Trooper demo harness</h1>
      <p style={{ fontSize: 13, color: '#57534e', margin: '0 0 24px' }}>
        Build a surface while looking at it. Workspaces mount on their own; scenarios run the full reel with a scrubber.
      </p>

      <h2 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#78716c', margin: '0 0 10px' }}>
        Workspaces
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10, marginBottom: 30 }}>
        {(Object.keys(FIXTURES) as WorkspaceKey[]).map((key) => (
          <button key={key} onClick={() => go(`/workspace/${key}`)} style={cardStyle}>
            <strong style={{ fontSize: 14 }}>{FIXTURES[key].label}</strong>
            <span style={{ fontSize: 11, color: '#78716c' }}>/workspace/{key}</span>
          </button>
        ))}
      </div>

      <h2 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#78716c', margin: '0 0 10px' }}>
        Scenarios
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
        {ALL_SCENARIOS.map((id) => {
          const inHero = HERO_SCENARIO_ROTATION.includes(id);
          return (
            <button key={id} onClick={() => go(`/scenario/${id}`)} style={cardStyle}>
              <strong style={{ fontSize: 14 }}>{id}</strong>
              <span style={{ fontSize: 11, color: inHero ? '#3f6b00' : '#78716c' }}>
                {inHero ? 'in hero rotation' : `${getDemoScenario(id).taskExecScript.length} exec steps`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start',
  padding: '12px 14px', borderRadius: 10, border: '1px solid #e7e5e4',
  background: '#fff', cursor: 'pointer', textAlign: 'left',
};

function ScenarioView({ id }: { id: DemoScenarioId }) {
  const scenario = useMemo(() => getDemoScenario(id), [id]);
  const total = scenario.chatScript.length + scenario.taskExecScript.length;
  const [speed, setSpeed] = useState(1);
  const [startStep, setStartStep] = useState(0);
  const [step, setStep] = useState(0);
  const [nonce, setNonce] = useState(0);

  return (
    <Chrome title={`scenario / ${id}`} onBack={() => go('/')}>
      <Toolbar>
        <Field label="Speed">
          {[0.25, 0.5, 1, 2, 4].map((s) => (
            <Btn key={s} on={speed === s} onClick={() => setSpeed(s)}>{s}×</Btn>
          ))}
        </Field>
        <Field label={`Jump to step (${step}/${total})`}>
          <input
            type="range"
            min={0}
            max={Math.max(0, total - 1)}
            value={startStep}
            onChange={(e) => setStartStep(Number(e.target.value))}
            style={{ width: 260 }}
          />
          <Btn onClick={() => setNonce((n) => n + 1)}>Jump</Btn>
        </Field>
        <Field label="">
          <Btn onClick={() => { setStartStep(0); setNonce((n) => n + 1); }}>Restart</Btn>
        </Field>
      </Toolbar>
      <Row>
        <TrooperDemo
          key={`${id}-${nonce}`}
          scenarioId={id}
          speed={speed}
          startStep={startStep}
          onStepChange={(i) => setStep(i)}
        />
      </Row>
    </Chrome>
  );
}

/** A workspace mounted alone, at the size it occupies inside the ticket. */
function WorkspaceView({ name }: { name: WorkspaceKey }) {
  const [tick, setTick] = useState(1);
  const [playhead, setPlayhead] = useState(6);
  const [genDone, setGenDone] = useState(false);
  const fx = FIXTURES[name];

  const body = (() => {
    switch (name) {
      case 'browser':
        return <DemoBrowserStream session={FIXTURES.browser.session} frameCount={tick} />;
      case 'video':
        return (
          <DemoVideoWorkspace
            project={FIXTURES.video.project}
            stage={tick > 1 ? 'timeline' : 'storyboard'}
            playhead={playhead}
            scenesReady={4}
          />
        );
      case 'generation':
        return (
          <DemoGenerationCard
            job={FIXTURES.generation.jobs[tick % FIXTURES.generation.jobs.length]}
            startedAt={genDone ? null : performance.now()}
            runMs={4000}
            done={genDone}
          />
        );
      case 'desktop':
        return (
          <DemoDesktopWorkspace
            session={FIXTURES.desktop.session}
            lines={[
              '$ trooper device wake studio-mac',
              'sending wake-on-lan to a4:83:e7:2c:11:9f',
              'device responded in 4.2s',
              '$ open -a Numbers ~/Finance/Q3-forecast.numbers',
              'workbook opened · 4 linked sheets resolved',
            ].slice(0, 2 + tick)}
            activities={['Woke Studio-Mac', 'Opened Q3-forecast.numbers'].slice(0, tick)}
          />
        );
      case 'nodes':
        return (
          <DemoNodeGraph
            graph={FIXTURES.nodes.graph}
            activeIds={FIXTURES.nodes.graph.nodes.slice(0, tick).map((n) => n.id)}
          />
        );
    }
  })();

  return (
    <Chrome title={`workspace / ${name}`} onBack={() => go('/')}>
      <Toolbar>
        <Field label="Progress">
          <Btn onClick={() => setTick((t) => Math.max(1, t - 1))}>−</Btn>
          <span style={{ minWidth: 24, textAlign: 'center', fontSize: 12 }}>{tick}</span>
          <Btn onClick={() => setTick((t) => t + 1)}>+</Btn>
        </Field>
        {name === 'video' && (
          <Field label={`Playhead ${playhead}s`}>
            <input type="range" min={0} max={24} step={0.5} value={playhead}
              onChange={(e) => setPlayhead(Number(e.target.value))} style={{ width: 220 }} />
          </Field>
        )}
        {name === 'generation' && (
          <Field label="">
            <Btn on={genDone} onClick={() => setGenDone((d) => !d)}>{genDone ? 'Resolved' : 'Running'}</Btn>
          </Field>
        )}
      </Toolbar>
      {/* Sized to the panel the workspace occupies inside the ticket modal. */}
      <div style={{ padding: 20 }}>
        <div style={{
          width: 720, height: 520, borderRadius: 12, overflow: 'hidden',
          border: '1px solid #e7e5e4', background: '#fff',
          boxShadow: '0 16px 40px -20px rgba(28,25,23,0.3)',
        }}>
          {body}
        </div>
        <p style={{ fontSize: 11, color: '#78716c', marginTop: 10 }}>
          {fx.label} · 720×520, the size this panel gets inside the ticket
        </p>
      </div>
    </Chrome>
  );
}

export function App() {
  const route = useRoute();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('scroll-behavior', 'auto');
  }, []);

  const view = (() => {
    const scenario = route.match(/^\/scenario\/(.+)$/);
    if (scenario) return <ScenarioView id={scenario[1] as DemoScenarioId} />;
    const ws = route.match(/^\/workspace\/(.+)$/);
    if (ws && ws[1] in FIXTURES) return <WorkspaceView name={ws[1] as WorkspaceKey} />;
    return <Picker />;
  })();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DEMO_KEYFRAMES }} />
      {reduced && <style>{`* { animation: none !important; transition: none !important; }`}</style>}
      <div style={{ position: 'fixed', right: 12, bottom: 12, zIndex: 999 }}>
        <Btn on={reduced} onClick={() => setReduced((r) => !r)}>
          {reduced ? 'Motion off' : 'Motion on'}
        </Btn>
      </div>
      {view}
    </>
  );
}
