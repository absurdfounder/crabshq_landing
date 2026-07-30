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

/* ── Browser session frames (analytics dashboard work) ── */

const APP_SIDEBAR = `
  <rect x="0" y="0" width="140" height="500" fill="#111827"/>
  <circle cx="26" cy="30" r="9" fill="#3f6b00"/>
  <rect x="42" y="25" width="62" height="9" rx="4" fill="#374151"/>
  <rect x="16" y="62" width="86" height="8" rx="4" fill="#4b5563"/>
  <rect x="16" y="84" width="104" height="8" rx="4" fill="#3f6b00"/>
  <rect x="16" y="106" width="74" height="8" rx="4" fill="#4b5563"/>
  <rect x="16" y="128" width="92" height="8" rx="4" fill="#4b5563"/>
  <rect x="16" y="150" width="64" height="8" rx="4" fill="#4b5563"/>`;

export const BROWSER_FRAMES = {
  login: page(`
    <rect x="256" y="120" width="248" height="262" rx="14" fill="#ffffff" stroke="#e5e7eb"/>
    <circle cx="380" cy="164" r="18" fill="#3f6b00"/>
    <text x="380" y="206" font-family="Arial" font-size="17" font-weight="bold" fill="#111827" text-anchor="middle">Sign in</text>
    <text x="380" y="226" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle">Wonder Analytics</text>
    <rect x="284" y="246" width="192" height="30" rx="7" fill="#f9fafb" stroke="#d1d5db"/>
    <text x="296" y="265" font-family="Arial" font-size="11" fill="#374151">aria@wonder.gg</text>
    <rect x="284" y="286" width="192" height="30" rx="7" fill="#f9fafb" stroke="#d1d5db"/>
    <text x="296" y="305" font-family="Arial" font-size="11" fill="#9ca3af">••••••••••</text>
    <rect x="284" y="330" width="192" height="30" rx="7" fill="#3f6b00"/>
    <text x="380" y="349" font-family="Arial" font-size="11.5" font-weight="bold" fill="#ffffff" text-anchor="middle">Continue</text>`, '#f3f4f6'),

  dashboard: page(`
    ${APP_SIDEBAR}
    <text x="168" y="46" font-family="Arial" font-size="19" font-weight="bold" fill="#111827">Overview</text>
    <text x="168" y="66" font-family="Arial" font-size="11" fill="#6b7280">Last 30 days</text>
    <g>
      <rect x="168" y="84" width="182" height="82" rx="9" fill="#ffffff" stroke="#e5e7eb"/>
      <text x="186" y="110" font-family="Arial" font-size="10" fill="#6b7280">SESSIONS</text>
      <text x="186" y="142" font-family="Arial" font-size="26" font-weight="bold" fill="#111827">18,402</text>
      <rect x="362" y="84" width="182" height="82" rx="9" fill="#ffffff" stroke="#e5e7eb"/>
      <text x="380" y="110" font-family="Arial" font-size="10" fill="#6b7280">SIGNUPS</text>
      <text x="380" y="142" font-family="Arial" font-size="26" font-weight="bold" fill="#111827">1,247</text>
      <rect x="556" y="84" width="182" height="82" rx="9" fill="#ffffff" stroke="#e5e7eb"/>
      <text x="574" y="110" font-family="Arial" font-size="10" fill="#6b7280">CONVERSION</text>
      <text x="574" y="142" font-family="Arial" font-size="26" font-weight="bold" fill="#3f6b00">6.8%</text>
    </g>
    <rect x="168" y="182" width="570" height="286" rx="9" fill="#ffffff" stroke="#e5e7eb"/>
    <text x="188" y="210" font-family="Arial" font-size="12" font-weight="bold" fill="#374151">Signups over time</text>
    <polyline points="192,420 262,382 332,394 402,330 472,352 542,286 612,300 706,244"
      fill="none" stroke="#3f6b00" stroke-width="3"/>
    <g fill="#3f6b00"><circle cx="402" cy="330" r="4"/><circle cx="542" cy="286" r="4"/><circle cx="706" cy="244" r="4"/></g>
    <g stroke="#f3f4f6"><line x1="192" y1="440" x2="720" y2="440"/><line x1="192" y1="370" x2="720" y2="370"/><line x1="192" y1="300" x2="720" y2="300"/></g>`, '#f9fafb'),

  filter: page(`
    ${APP_SIDEBAR}
    <text x="168" y="46" font-family="Arial" font-size="19" font-weight="bold" fill="#111827">Signups by source</text>
    <rect x="168" y="62" width="570" height="40" rx="8" fill="#ffffff" stroke="#e5e7eb"/>
    <text x="186" y="87" font-family="Arial" font-size="11" fill="#6b7280">Date range</text>
    <rect x="520" y="72" width="96" height="22" rx="6" fill="#3f6b00"/>
    <text x="568" y="87" font-family="Arial" font-size="10.5" font-weight="bold" fill="#ffffff" text-anchor="middle">Last 7 days</text>
    <rect x="624" y="72" width="96" height="22" rx="6" fill="#f3f4f6"/>
    <text x="672" y="87" font-family="Arial" font-size="10.5" fill="#6b7280" text-anchor="middle">Last 30 days</text>
    <rect x="168" y="116" width="570" height="352" rx="9" fill="#ffffff" stroke="#e5e7eb"/>
    <g font-family="Arial" font-size="12" fill="#374151">
      <text x="190" y="150" font-size="10" fill="#6b7280">SOURCE</text>
      <text x="470" y="150" font-size="10" fill="#6b7280">SIGNUPS</text>
      <text x="620" y="150" font-size="10" fill="#6b7280">CONVERSION</text>
      <line x1="188" y1="162" x2="718" y2="162" stroke="#e5e7eb"/>
      <text x="190" y="196">Product Hunt</text><text x="470" y="196">612</text><text x="620" y="196" font-weight="bold" fill="#3f6b00">11.4%</text>
      <line x1="188" y1="212" x2="718" y2="212" stroke="#f3f4f6"/>
      <text x="190" y="246">Organic search</text><text x="470" y="246">318</text><text x="620" y="246">5.1%</text>
      <line x1="188" y1="262" x2="718" y2="262" stroke="#f3f4f6"/>
      <text x="190" y="296">Direct</text><text x="470" y="296">201</text><text x="620" y="296">4.7%</text>
      <line x1="188" y1="312" x2="718" y2="312" stroke="#f3f4f6"/>
      <text x="190" y="346">Reddit</text><text x="470" y="346">84</text><text x="620" y="346">3.2%</text>
      <line x1="188" y1="362" x2="718" y2="362" stroke="#f3f4f6"/>
      <text x="190" y="396">Newsletter</text><text x="470" y="396">32</text><text x="620" y="396" font-weight="bold" fill="#3f6b00">9.8%</text>
      <line x1="188" y1="412" x2="718" y2="412" stroke="#e5e7eb"/>
      <text x="190" y="444" font-weight="bold">Total</text><text x="470" y="444" font-weight="bold">1,247</text><text x="620" y="444" font-weight="bold">6.8%</text>
    </g>`, '#f9fafb'),

  export: page(`
    ${APP_SIDEBAR}
    <rect x="168" y="62" width="570" height="406" rx="9" fill="#ffffff" stroke="#e5e7eb" opacity="0.5"/>
    <rect x="228" y="150" width="404" height="216" rx="14" fill="#ffffff" stroke="#e5e7eb"/>
    <text x="256" y="192" font-family="Arial" font-size="17" font-weight="bold" fill="#111827">Export report</text>
    <text x="256" y="214" font-family="Arial" font-size="11" fill="#6b7280">5 rows · grouped by source</text>
    <rect x="256" y="232" width="348" height="32" rx="7" fill="#f9fafb" stroke="#d1d5db"/>
    <text x="270" y="253" font-family="Arial" font-size="11.5" fill="#374151">launch-week-signups.csv</text>
    <rect x="256" y="276" width="170" height="28" rx="6" fill="#eef2ff" stroke="#3f6b00"/>
    <text x="341" y="295" font-family="Arial" font-size="11" font-weight="bold" fill="#3f6b00" text-anchor="middle">CSV</text>
    <rect x="434" y="276" width="170" height="28" rx="6" fill="#f3f4f6"/>
    <text x="519" y="295" font-family="Arial" font-size="11" fill="#9ca3af" text-anchor="middle">PDF</text>
    <rect x="256" y="316" width="348" height="32" rx="7" fill="#3f6b00"/>
    <text x="430" y="337" font-family="Arial" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Download</text>`, '#f9fafb'),
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
    <text x="96" y="201" font-family="Arial" font-size="11" font-weight="bold" fill="#0a1400" text-anchor="middle">wonder.gg</text>`),

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
    <text x="200" y="196" font-family="Arial" font-size="12" font-weight="bold" fill="#9ae66e" text-anchor="middle">wonder.gg</text>`),
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
