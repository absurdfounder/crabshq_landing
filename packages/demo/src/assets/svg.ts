/**
 * Inline SVG stand-ins for captured screens, generated frames and video scenes.
 *
 * These are strings rather than files on purpose: the demo must render every
 * pixel without a network request, so a locked-down corporate network — or the
 * sandboxed iframe the demo runs inside — can't leave a workspace blank.
 */

const FILL = 'position:absolute;inset:0;width:100%;height:100%';

function frame(inner: string, bg = '#ffffff'): string {
  return `<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" style="${FILL}" role="img">
    <rect width="400" height="260" fill="${bg}"/>${inner}
  </svg>`;
}

/**
 * Page content only. The workspace header already shows the URL and capture
 * source, so drawing browser chrome into the frame would show it twice — and
 * the app's own captures are viewport content, not the whole window.
 */
function page(inner: string, bg = '#ffffff'): string {
  return `<svg viewBox="0 0 760 500" preserveAspectRatio="xMidYMid slice" style="${FILL}" role="img">
    <rect width="760" height="500" fill="${bg}"/>${inner}
  </svg>`;
}

/* ── Browser session frames (Wonder Analytics — PostHog/Amplitude density) ── */

const FONT = `font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"`;

function appShell(active: 'overview' | 'acquisition'): string {
  const overviewOn = active === 'overview';
  const acqOn = active === 'acquisition';
  return `
  <defs>
    <linearGradient id="waSide" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0c1222"/><stop offset="100%" stop-color="#111827"/>
    </linearGradient>
    <linearGradient id="waChart" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#84cc16" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#84cc16" stop-opacity="0"/>
    </linearGradient>
    <filter id="waCard" x="-2%" y="-2%" width="104%" height="108%">
      <feDropShadow dx="0" dy="1" stdDeviation="1.2" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>
  <rect x="0" y="0" width="168" height="500" fill="url(#waSide)"/>
  <rect x="16" y="18" width="28" height="28" rx="8" fill="#a3e635"/>
  <text x="30" y="37" ${FONT} font-size="13" font-weight="800" fill="#0a1400" text-anchor="middle">W</text>
  <text x="52" y="30" ${FONT} font-size="12.5" font-weight="700" fill="#f8fafc">Wonder</text>
  <text x="52" y="44" ${FONT} font-size="9" fill="#94a3b8">Analytics</text>
  <text x="16" y="78" ${FONT} font-size="9" font-weight="600" fill="#64748b" letter-spacing="0.08em">WORKSPACE</text>
  <rect x="12" y="90" width="144" height="32" rx="8" fill="${overviewOn ? 'rgba(163,230,53,0.14)' : 'transparent'}"/>
  <circle cx="28" cy="106" r="3.5" fill="${overviewOn ? '#a3e635' : '#475569'}"/>
  <text x="40" y="110" ${FONT} font-size="11.5" font-weight="${overviewOn ? '600' : '400'}" fill="${overviewOn ? '#ecfccb' : '#94a3b8'}">Overview</text>
  <rect x="12" y="126" width="144" height="32" rx="8" fill="${acqOn ? 'rgba(163,230,53,0.14)' : 'transparent'}"/>
  <circle cx="28" cy="142" r="3.5" fill="${acqOn ? '#a3e635' : '#475569'}"/>
  <text x="40" y="146" ${FONT} font-size="11.5" font-weight="${acqOn ? '600' : '400'}" fill="${acqOn ? '#ecfccb' : '#94a3b8'}">Acquisition</text>
  <circle cx="28" cy="174" r="3.5" fill="#475569"/>
  <text x="40" y="178" ${FONT} font-size="11.5" fill="#94a3b8">Funnels</text>
  <circle cx="28" cy="206" r="3.5" fill="#475569"/>
  <text x="40" y="210" ${FONT} font-size="11.5" fill="#94a3b8">Retention</text>
  <circle cx="28" cy="238" r="3.5" fill="#475569"/>
  <text x="40" y="242" ${FONT} font-size="11.5" fill="#94a3b8">Live</text>
  <text x="16" y="286" ${FONT} font-size="9" font-weight="600" fill="#64748b" letter-spacing="0.08em">LAUNCH WEEK</text>
  <rect x="12" y="298" width="144" height="28" rx="7" fill="${acqOn ? 'rgba(163,230,53,0.1)' : 'rgba(255,255,255,0.04)'}"/>
  <text x="24" y="316" ${FONT} font-size="11" font-weight="${acqOn ? '600' : '400'}" fill="${acqOn ? '#ecfccb' : '#cbd5e1'}">Signups by source</text>
  <rect x="12" y="332" width="144" height="28" rx="7" fill="transparent"/>
  <text x="24" y="350" ${FONT} font-size="11" fill="#64748b">PH referral path</text>
  <rect x="168" y="0" width="592" height="52" fill="#ffffff"/>
  <line x1="168" y1="52" x2="760" y2="52" stroke="#e2e8f0"/>
  <rect x="184" y="12" width="220" height="28" rx="8" fill="#f1f5f9"/>
  <text x="198" y="30" ${FONT} font-size="11" fill="#94a3b8">Search events, pages…</text>
  <rect x="520" y="12" width="118" height="28" rx="8" fill="#ffffff" stroke="#e2e8f0"/>
  <text x="536" y="30" ${FONT} font-size="11" font-weight="600" fill="#334155">Jul 24 – Jul 31</text>
  <circle cx="670" cy="26" r="12" fill="#ecfccb"/>
  <text x="670" y="30" ${FONT} font-size="9" font-weight="700" fill="#3f6212" text-anchor="middle">A</text>
  <text x="690" y="24" ${FONT} font-size="11" font-weight="600" fill="#0f172a">Aria</text>
  <text x="690" y="36" ${FONT} font-size="9" fill="#94a3b8">wonderdesk.ai</text>`;
}

export const BROWSER_FRAMES = {
  login: page(`
    <defs>
      <linearGradient id="waLoginBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0c1222"/><stop offset="55%" stop-color="#132032"/>
        <stop offset="100%" stop-color="#1a2e1a"/>
      </linearGradient>
      <linearGradient id="waLoginAccent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#a3e635"/><stop offset="100%" stop-color="#4d7c0f"/>
      </linearGradient>
      <filter id="waLoginShadow" x="-8%" y="-8%" width="116%" height="120%">
        <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#020617" flood-opacity="0.45"/>
      </filter>
    </defs>
    <rect width="760" height="500" fill="url(#waLoginBg)"/>
    <circle cx="620" cy="80" r="120" fill="#a3e635" opacity="0.08"/>
    <circle cx="120" cy="420" r="160" fill="#84cc16" opacity="0.06"/>
    <!-- brand column -->
    <rect x="0" y="0" width="320" height="500" fill="rgba(2,6,23,0.35)"/>
    <rect x="40" y="48" width="36" height="36" rx="10" fill="#a3e635"/>
    <text x="58" y="72" ${FONT} font-size="16" font-weight="800" fill="#0a1400" text-anchor="middle">W</text>
    <text x="88" y="64" ${FONT} font-size="16" font-weight="700" fill="#f8fafc">Wonder Analytics</text>
    <text x="88" y="82" ${FONT} font-size="11" fill="#94a3b8">Product analytics for indie launches</text>
    <text x="40" y="160" ${FONT} font-size="28" font-weight="700" fill="#f8fafc">See what</text>
    <text x="40" y="196" ${FONT} font-size="28" font-weight="700" fill="#f8fafc">moved the</text>
    <text x="40" y="232" ${FONT} font-size="28" font-weight="700" fill="#a3e635">needle.</text>
    <text x="40" y="280" ${FONT} font-size="12" fill="#94a3b8">Launch-week signups · sources · conversion</text>
    <text x="40" y="300" ${FONT} font-size="12" fill="#94a3b8">Shared seat · wonderdesk.ai workspace</text>
    <g>
      <rect x="40" y="360" width="220" height="52" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
      <text x="56" y="382" ${FONT} font-size="10" fill="#64748b">LIVE RIGHT NOW</text>
      <text x="56" y="400" ${FONT} font-size="14" font-weight="700" fill="#ecfccb">142 sessions · last hour</text>
    </g>
    <!-- form card -->
    <rect x="372" y="78" width="336" height="360" rx="18" fill="#ffffff" filter="url(#waLoginShadow)"/>
    <text x="404" y="120" ${FONT} font-size="22" font-weight="700" fill="#0f172a">Welcome back</text>
    <text x="404" y="142" ${FONT} font-size="12" fill="#64748b">Sign in to the wonderdesk.ai workspace</text>
    <text x="404" y="178" ${FONT} font-size="11" font-weight="600" fill="#334155">Work email</text>
    <rect x="404" y="186" width="272" height="40" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="420" y="211" ${FONT} font-size="13" fill="#0f172a">aria@wonderdesk.ai</text>
    <text x="404" y="252" ${FONT} font-size="11" font-weight="600" fill="#334155">Password</text>
    <rect x="404" y="260" width="272" height="40" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="420" y="285" ${FONT} font-size="13" fill="#94a3b8" letter-spacing="0.12em">••••••••••••</text>
    <text x="620" y="252" ${FONT} font-size="10" font-weight="600" fill="#4d7c0f" text-anchor="end">Forgot?</text>
    <rect x="404" y="320" width="272" height="42" rx="11" fill="url(#waLoginAccent)"/>
    <text x="540" y="346" ${FONT} font-size="13.5" font-weight="700" fill="#0a1400" text-anchor="middle">Continue to dashboard</text>
    <line x1="404" y1="384" x2="676" y2="384" stroke="#e2e8f0"/>
    <text x="540" y="378" ${FONT} font-size="10" fill="#94a3b8" text-anchor="middle">or</text>
    <rect x="404" y="396" width="272" height="28" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="540" y="415" ${FONT} font-size="11" font-weight="600" fill="#334155" text-anchor="middle">Continue with Google</text>
  `, '#0c1222'),

  dashboard: page(`
    ${appShell('overview')}
    <rect x="168" y="52" width="592" height="448" fill="#f1f5f9"/>
    <text x="188" y="88" ${FONT} font-size="20" font-weight="700" fill="#0f172a">Overview</text>
    <text x="188" y="108" ${FONT} font-size="11" fill="#64748b">Launch week · wonderdesk.ai · compared to prior 7 days</text>
    <rect x="620" y="72" width="116" height="30" rx="8" fill="#0f172a"/>
    <text x="678" y="91" ${FONT} font-size="11" font-weight="600" fill="#f8fafc" text-anchor="middle">Export report</text>
    <!-- KPI cards -->
    <g filter="url(#waCard)">
      <rect x="188" y="124" width="172" height="96" rx="14" fill="#ffffff"/>
      <text x="208" y="150" ${FONT} font-size="10" font-weight="600" fill="#64748b" letter-spacing="0.06em">SESSIONS</text>
      <text x="208" y="184" ${FONT} font-size="28" font-weight="700" fill="#0f172a">18,402</text>
      <rect x="208" y="196" width="52" height="16" rx="8" fill="#dcfce7"/>
      <text x="234" y="208" ${FONT} font-size="10" font-weight="700" fill="#166534" text-anchor="middle">+24%</text>
      <polyline points="280,196 292,190 304,192 316,180 328,184 340,168" fill="none" stroke="#84cc16" stroke-width="2"/>
    </g>
    <g filter="url(#waCard)">
      <rect x="372" y="124" width="172" height="96" rx="14" fill="#ffffff"/>
      <text x="392" y="150" ${FONT} font-size="10" font-weight="600" fill="#64748b" letter-spacing="0.06em">SIGNUPS</text>
      <text x="392" y="184" ${FONT} font-size="28" font-weight="700" fill="#0f172a">1,247</text>
      <rect x="392" y="196" width="52" height="16" rx="8" fill="#dcfce7"/>
      <text x="418" y="208" ${FONT} font-size="10" font-weight="700" fill="#166534" text-anchor="middle">+38%</text>
      <polyline points="464,200 476,188 488,192 500,176 512,170 524,156" fill="none" stroke="#84cc16" stroke-width="2"/>
    </g>
    <g filter="url(#waCard)">
      <rect x="556" y="124" width="180" height="96" rx="14" fill="#ffffff"/>
      <text x="576" y="150" ${FONT} font-size="10" font-weight="600" fill="#64748b" letter-spacing="0.06em">CONVERSION</text>
      <text x="576" y="184" ${FONT} font-size="28" font-weight="700" fill="#3f6212">6.8%</text>
      <rect x="576" y="196" width="52" height="16" rx="8" fill="#ecfccb"/>
      <text x="602" y="208" ${FONT} font-size="10" font-weight="700" fill="#3f6212" text-anchor="middle">+1.2pt</text>
      <polyline points="648,198 660,194 672,188 684,190 696,178 708,172" fill="none" stroke="#65a30d" stroke-width="2"/>
    </g>
    <!-- main chart -->
    <g filter="url(#waCard)">
      <rect x="188" y="236" width="548" height="232" rx="14" fill="#ffffff"/>
      <text x="208" y="264" ${FONT} font-size="13" font-weight="700" fill="#0f172a">Signups over time</text>
      <text x="208" y="282" ${FONT} font-size="10" fill="#94a3b8">Daily unique signups · UTC</text>
      <circle cx="620" cy="256" r="4" fill="#84cc16"/>
      <text x="630" y="260" ${FONT} font-size="10" fill="#64748b">Signups</text>
      <circle cx="684" cy="256" r="4" fill="#94a3b8"/>
      <text x="694" y="260" ${FONT} font-size="10" fill="#64748b">Sessions ÷ 10</text>
      <g stroke="#f1f5f9" stroke-width="1">
        <line x1="208" y1="320" x2="716" y2="320"/>
        <line x1="208" y1="360" x2="716" y2="360"/>
        <line x1="208" y1="400" x2="716" y2="400"/>
        <line x1="208" y1="440" x2="716" y2="440"/>
      </g>
      <path d="M208,430 L270,408 L332,414 L394,372 L456,386 L518,340 L580,352 L642,300 L716,268 L716,440 L208,440 Z" fill="url(#waChart)"/>
      <polyline points="208,430 270,408 332,414 394,372 456,386 518,340 580,352 642,300 716,268"
        fill="none" stroke="#65a30d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="208,390 270,378 332,370 394,360 456,352 518,340 580,328 642,318 716,300"
        fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.8"/>
      <g ${FONT} font-size="9" fill="#94a3b8">
        <text x="208" y="458">Jul 24</text><text x="332" y="458">26</text>
        <text x="456" y="458">28</text><text x="580" y="458">30</text><text x="700" y="458">31</text>
      </g>
    </g>
  `, '#f1f5f9'),

  filter: page(`
    ${appShell('acquisition')}
    <rect x="168" y="52" width="592" height="448" fill="#f1f5f9"/>
    <text x="188" y="88" ${FONT} font-size="20" font-weight="700" fill="#0f172a">Signups by source</text>
    <text x="188" y="108" ${FONT} font-size="11" fill="#64748b">Grouped acquisition · launch week</text>
    <!-- filter bar -->
    <g filter="url(#waCard)">
      <rect x="188" y="120" width="548" height="44" rx="12" fill="#ffffff"/>
      <rect x="200" y="130" width="92" height="24" rx="12" fill="#0f172a"/>
      <text x="246" y="146" ${FONT} font-size="10.5" font-weight="700" fill="#f8fafc" text-anchor="middle">Last 7 days</text>
      <rect x="300" y="130" width="96" height="24" rx="12" fill="#f1f5f9" stroke="#e2e8f0"/>
      <text x="348" y="146" ${FONT} font-size="10.5" fill="#64748b" text-anchor="middle">Last 30 days</text>
      <rect x="404" y="130" width="110" height="24" rx="12" fill="#ecfccb" stroke="#bef264"/>
      <text x="459" y="146" ${FONT} font-size="10.5" font-weight="600" fill="#3f6212" text-anchor="middle">Group: source</text>
      <rect x="522" y="130" width="88" height="24" rx="12" fill="#f1f5f9" stroke="#e2e8f0"/>
      <text x="566" y="146" ${FONT} font-size="10.5" fill="#64748b" text-anchor="middle">+ Filter</text>
      <rect x="618" y="130" width="102" height="24" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="669" y="146" ${FONT} font-size="10.5" font-weight="600" fill="#334155" text-anchor="middle">Export CSV</text>
    </g>
    <!-- table + bars -->
    <g filter="url(#waCard)">
      <rect x="188" y="176" width="548" height="292" rx="14" fill="#ffffff"/>
      <g ${FONT} font-size="10" font-weight="600" fill="#94a3b8" letter-spacing="0.04em">
        <text x="208" y="202">SOURCE</text>
        <text x="420" y="202">SIGNUPS</text>
        <text x="520" y="202">CONV.</text>
        <text x="600" y="202">SHARE</text>
      </g>
      <line x1="208" y1="214" x2="716" y2="214" stroke="#f1f5f9"/>
      <!-- rows -->
      <rect x="200" y="222" width="524" height="42" rx="8" fill="#f8fafc"/>
      <circle cx="220" cy="243" r="10" fill="#ff6154"/>
      <text x="220" y="247" ${FONT} font-size="8" font-weight="800" fill="#fff" text-anchor="middle">PH</text>
      <text x="240" y="240" ${FONT} font-size="12" font-weight="600" fill="#0f172a">Product Hunt</text>
      <text x="240" y="254" ${FONT} font-size="9" fill="#94a3b8">referral · /ph</text>
      <text x="420" y="248" ${FONT} font-size="13" font-weight="700" fill="#0f172a">612</text>
      <text x="520" y="248" ${FONT} font-size="13" font-weight="700" fill="#3f6212">11.4%</text>
      <rect x="600" y="236" width="96" height="14" rx="4" fill="#f1f5f9"/>
      <rect x="600" y="236" width="72" height="14" rx="4" fill="#84cc16"/>

      <circle cx="220" cy="293" r="10" fill="#0ea5e9"/>
      <text x="220" y="297" ${FONT} font-size="8" font-weight="800" fill="#fff" text-anchor="middle">OG</text>
      <text x="240" y="290" ${FONT} font-size="12" font-weight="600" fill="#0f172a">Organic search</text>
      <text x="240" y="304" ${FONT} font-size="9" fill="#94a3b8">google / brand</text>
      <text x="420" y="298" ${FONT} font-size="13" font-weight="600" fill="#0f172a">318</text>
      <text x="520" y="298" ${FONT} font-size="13" fill="#334155">5.1%</text>
      <rect x="600" y="286" width="96" height="14" rx="4" fill="#f1f5f9"/>
      <rect x="600" y="286" width="40" height="14" rx="4" fill="#38bdf8"/>

      <rect x="200" y="322" width="524" height="42" rx="8" fill="#f8fafc"/>
      <circle cx="220" cy="343" r="10" fill="#64748b"/>
      <text x="220" y="347" ${FONT} font-size="8" font-weight="800" fill="#fff" text-anchor="middle">D</text>
      <text x="240" y="340" ${FONT} font-size="12" font-weight="600" fill="#0f172a">Direct</text>
      <text x="240" y="354" ${FONT} font-size="9" fill="#94a3b8">(none)</text>
      <text x="420" y="348" ${FONT} font-size="13" font-weight="600" fill="#0f172a">201</text>
      <text x="520" y="348" ${FONT} font-size="13" fill="#334155">4.7%</text>
      <rect x="600" y="336" width="96" height="14" rx="4" fill="#f1f5f9"/>
      <rect x="600" y="336" width="28" height="14" rx="4" fill="#94a3b8"/>

      <circle cx="220" cy="393" r="10" fill="#f97316"/>
      <text x="220" y="397" ${FONT} font-size="8" font-weight="800" fill="#fff" text-anchor="middle">R</text>
      <text x="240" y="390" ${FONT} font-size="12" font-weight="600" fill="#0f172a">Reddit</text>
      <text x="240" y="404" ${FONT} font-size="9" fill="#94a3b8">r/IndieGaming</text>
      <text x="420" y="398" ${FONT} font-size="13" font-weight="600" fill="#0f172a">84</text>
      <text x="520" y="398" ${FONT} font-size="13" fill="#334155">3.2%</text>
      <rect x="600" y="386" width="96" height="14" rx="4" fill="#f1f5f9"/>
      <rect x="600" y="386" width="14" height="14" rx="4" fill="#fb923c"/>

      <rect x="200" y="422" width="524" height="36" rx="8" fill="#f8fafc"/>
      <circle cx="220" cy="440" r="10" fill="#8b5cf6"/>
      <text x="220" y="444" ${FONT} font-size="8" font-weight="800" fill="#fff" text-anchor="middle">N</text>
      <text x="240" y="444" ${FONT} font-size="12" font-weight="600" fill="#0f172a">Newsletter</text>
      <text x="420" y="444" ${FONT} font-size="13" font-weight="600" fill="#0f172a">32</text>
      <text x="520" y="444" ${FONT} font-size="13" font-weight="700" fill="#3f6212">9.8%</text>
      <rect x="600" y="433" width="96" height="14" rx="4" fill="#f1f5f9"/>
      <rect x="600" y="433" width="10" height="14" rx="4" fill="#a78bfa"/>
    </g>
  `, '#f1f5f9'),

  export: page(`
    ${appShell('acquisition')}
    <rect x="168" y="52" width="592" height="448" fill="#f1f5f9"/>
    <!-- dimmed table behind -->
    <g opacity="0.45">
      <rect x="188" y="72" width="548" height="400" rx="14" fill="#ffffff"/>
      <text x="208" y="104" ${FONT} font-size="16" font-weight="700" fill="#0f172a">Signups by source</text>
      <rect x="208" y="124" width="508" height="28" rx="8" fill="#f1f5f9"/>
      <rect x="208" y="168" width="508" height="36" rx="8" fill="#f8fafc"/>
      <rect x="208" y="214" width="508" height="36" rx="8" fill="#ffffff"/>
      <rect x="208" y="260" width="508" height="36" rx="8" fill="#f8fafc"/>
      <rect x="208" y="306" width="508" height="36" rx="8" fill="#ffffff"/>
    </g>
    <rect x="168" y="52" width="592" height="448" fill="#0f172a" opacity="0.28"/>
    <!-- modal -->
    <g filter="url(#waCard)">
      <rect x="250" y="120" width="420" height="300" rx="18" fill="#ffffff"/>
      <rect x="250" y="120" width="420" height="56" rx="18" fill="#ffffff"/>
      <text x="274" y="154" ${FONT} font-size="17" font-weight="700" fill="#0f172a">Export report</text>
      <circle cx="638" cy="148" r="12" fill="#f1f5f9"/>
      <text x="638" y="152" ${FONT} font-size="12" fill="#64748b" text-anchor="middle">✕</text>
      <line x1="250" y1="176" x2="670" y2="176" stroke="#f1f5f9"/>
      <text x="274" y="206" ${FONT} font-size="11" fill="#64748b">5 sources · last 7 days · wonderdesk.ai launch week</text>
      <text x="274" y="236" ${FONT} font-size="11" font-weight="600" fill="#334155">File name</text>
      <rect x="274" y="244" width="372" height="40" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="290" y="269" ${FONT} font-size="13" fill="#0f172a">launch-week-signups.csv</text>
      <text x="274" y="310" ${FONT} font-size="11" font-weight="600" fill="#334155">Format</text>
      <rect x="274" y="318" width="178" height="36" rx="10" fill="#ecfccb" stroke="#84cc16"/>
      <text x="363" y="341" ${FONT} font-size="12" font-weight="700" fill="#3f6212" text-anchor="middle">CSV · spreadsheet</text>
      <rect x="468" y="318" width="178" height="36" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="557" y="341" ${FONT} font-size="12" font-weight="600" fill="#94a3b8" text-anchor="middle">PDF · summary</text>
      <rect x="274" y="372" width="372" height="30" rx="8" fill="#f0fdf4"/>
      <text x="290" y="392" ${FONT} font-size="10.5" fill="#166534">Includes source, signups, conversion, share %</text>
      <rect x="274" y="414" width="372" height="42" rx="11" fill="#0f172a"/>
      <text x="460" y="440" ${FONT} font-size="13.5" font-weight="700" fill="#a3e635" text-anchor="middle">Download CSV</text>
    </g>
  `, '#f1f5f9'),
} as const;

/* ── Video scenes ── */

export const VIDEO_SCENES = {
  hook: frame(`
    <defs><linearGradient id="vg1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3b1d5e"/><stop offset="100%" stop-color="#0f172a"/></linearGradient></defs>
    <rect width="400" height="260" fill="url(#vg1)"/>
    <circle cx="316" cy="60" r="40" fill="#a78bfa" opacity="0.28"/>
    <text x="40" y="126" font-family="Arial" font-size="30" font-weight="bold" fill="#ffffff">2,418 games.</text>
    <text x="40" y="160" font-family="Arial" font-size="30" font-weight="bold" fill="#9ae66e">One feed.</text>
    <rect x="40" y="184" width="112" height="26" rx="13" fill="#9ae66e"/>
    <text x="96" y="201" font-family="Arial" font-size="11" font-weight="bold" fill="#0a1400" text-anchor="middle">wonderdesk.ai</text>`),

  product: frame(`
    <rect width="400" height="260" fill="#0d0d10"/>
    <rect x="28" y="34" width="344" height="192" rx="10" fill="#141419" stroke="rgba(255,255,255,0.1)"/>
    <rect x="28" y="34" width="344" height="26" rx="10" fill="#1b1b21"/>
    <g fill="#3f3f46"><circle cx="46" cy="47" r="4"/><circle cx="60" cy="47" r="4"/><circle cx="74" cy="47" r="4"/></g>
    <g>
      <rect x="44" y="74" width="150" height="66" rx="7" fill="#243b2f"/>
      <rect x="206" y="74" width="150" height="66" rx="7" fill="#1b1436"/>
      <rect x="44" y="150" width="150" height="62" rx="7" fill="#3a2320"/>
      <rect x="206" y="150" width="150" height="62" rx="7" fill="#123a45"/>
    </g>
    <text x="200" y="252" font-family="Arial" font-size="10" fill="#71717a" text-anchor="middle">Curated daily</text>`),

  proof: frame(`
    <rect width="400" height="260" fill="#0a1400"/>
    <text x="200" y="96" font-family="Arial" font-size="46" font-weight="bold" fill="#9ae66e" text-anchor="middle">#3</text>
    <text x="200" y="126" font-family="Arial" font-size="13" fill="#d9f99d" text-anchor="middle">Product of the Day</text>
    <g stroke="rgba(154,230,110,0.35)" stroke-width="1" fill="none">
      <rect x="96" y="150" width="208" height="46" rx="8"/>
    </g>
    <text x="200" y="172" font-family="Arial" font-size="11" fill="#ffffff" text-anchor="middle">61,000 monthly players</text>
    <text x="200" y="188" font-family="Arial" font-size="9" fill="#84cc16" text-anchor="middle">and climbing</text>`),

  cta: frame(`
    <rect width="400" height="260" fill="#9ae66e"/>
    <text x="200" y="118" font-family="Arial" font-size="28" font-weight="bold" fill="#0a1400" text-anchor="middle">Find your next</text>
    <text x="200" y="152" font-family="Arial" font-size="28" font-weight="bold" fill="#0a1400" text-anchor="middle">obsession.</text>
    <rect x="140" y="176" width="120" height="30" rx="15" fill="#0a1400"/>
    <text x="200" y="196" font-family="Arial" font-size="12" font-weight="bold" fill="#9ae66e" text-anchor="middle">wonderdesk.ai</text>`),
} as const;

/* ── Generated assets ── */

export const GENERATED = {
  broll: frame(`
    <defs><linearGradient id="gb" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbbf24"/><stop offset="55%" stop-color="#f97316"/><stop offset="100%" stop-color="#7c2d12"/></linearGradient></defs>
    <rect width="400" height="260" fill="url(#gb)"/>
    <circle cx="300" cy="70" r="34" fill="#fff7ed" opacity="0.85"/>
    <path d="M0 190 L70 152 L140 184 L214 140 L290 178 L360 146 L400 172 L400 260 L0 260 Z" fill="#7c2d12" opacity="0.75"/>
    <path d="M0 216 L84 190 L164 214 L246 186 L330 212 L400 190 L400 260 L0 260 Z" fill="#431407"/>
    <g fill="#431407"><rect x="88" y="200" width="5" height="18"/><path d="M90.5 178 l14 24 h-28 z"/></g>`),

  thumbnail: frame(`
    <rect width="400" height="260" fill="#111827"/>
    <rect x="0" y="0" width="400" height="260" fill="#1e1b4b"/>
    <circle cx="90" cy="132" r="54" fill="#9ae66e" opacity="0.9"/>
    <path d="M74 108 l40 24 l-40 24 z" fill="#0a1400"/>
    <text x="168" y="120" font-family="Arial" font-size="24" font-weight="bold" fill="#ffffff">Launch day</text>
    <text x="168" y="150" font-family="Arial" font-size="24" font-weight="bold" fill="#9ae66e">recap</text>
    <rect x="168" y="168" width="86" height="20" rx="10" fill="rgba(255,255,255,0.14)"/>
    <text x="211" y="182" font-family="Arial" font-size="10" fill="#e4e4e7" text-anchor="middle">0:24</text>`),
} as const;

/* ── Agent desktop screen ── */

export const DESKTOP_SCREEN = frame(`
  <rect width="400" height="260" fill="#1e293b"/>
  <rect width="400" height="20" fill="#0f172a"/>
  <g fill="#64748b" font-family="Arial" font-size="8">
    <text x="10" y="13.5">Finder</text><text x="52" y="13.5">File</text><text x="80" y="13.5">Edit</text><text x="110" y="13.5">View</text>
    <text x="368" y="13.5">14:58</text>
  </g>
  <rect x="26" y="36" width="348" height="196" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
  <rect x="26" y="36" width="348" height="24" rx="8" fill="#e2e8f0"/>
  <g fill="#94a3b8"><circle cx="42" cy="48" r="4"/><circle cx="56" cy="48" r="4"/><circle cx="70" cy="48" r="4"/></g>
  <text x="200" y="52" font-family="Arial" font-size="9" font-weight="bold" fill="#475569" text-anchor="middle">Numbers — Q3-forecast.numbers</text>
  <g font-family="Arial" font-size="8" fill="#334155">
    <line x1="40" y1="74" x2="360" y2="74" stroke="#e2e8f0"/>
    <text x="46" y="86">Region</text><text x="150" y="86">Q2 actual</text><text x="240" y="86">Q3 forecast</text><text x="326" y="86">Δ</text>
    <line x1="40" y1="92" x2="360" y2="92" stroke="#cbd5e1"/>
    <text x="46" y="108">North America</text><text x="150" y="108">$412k</text><text x="240" y="108">$486k</text><text x="326" y="108" fill="#16a34a">+18%</text>
    <text x="46" y="128">EMEA</text><text x="150" y="128">$268k</text><text x="240" y="128">$301k</text><text x="326" y="128" fill="#16a34a">+12%</text>
    <text x="46" y="148">APAC</text><text x="150" y="148">$147k</text><text x="240" y="148">$139k</text><text x="326" y="148" fill="#dc2626">−5%</text>
    <text x="46" y="168">LATAM</text><text x="150" y="168">$64k</text><text x="240" y="168">$88k</text><text x="326" y="168" fill="#16a34a">+38%</text>
    <line x1="40" y1="178" x2="360" y2="178" stroke="#cbd5e1"/>
    <text x="46" y="194" font-weight="bold">Total</text><text x="150" y="194" font-weight="bold">$891k</text><text x="240" y="194" font-weight="bold">$1.014M</text><text x="326" y="194" font-weight="bold" fill="#16a34a">+14%</text>
  </g>
  <rect x="238" y="200" width="122" height="24" rx="5" fill="#3f6b00"/>
  <text x="299" y="216" font-family="Arial" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">Export to PDF</text>`);
