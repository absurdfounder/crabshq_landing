"use client";

import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleCheck,
  Code2,
  FileText,
  Globe2,
  Layers3,
  LockKeyhole,
  Menu,
  MessageSquare,
  Play,
  Plus,
  Repeat2,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { Menu as HeadlessMenu } from "@headlessui/react";
import HeroDownloadButtons from "@/components/HeroDownloadButtons";
import SimplePricing from "@/components/SimplePricing";
import FAQ from "@/components/faq";
import type { IntegrationTile } from "@/lib/integrationScroller";
import {
  featureNavItems,
  teamNavItems,
  primaryNavLinks,
} from "@/components/ui/nav-data";
import s from "./landing.module.css";

const APP = "https://app.trooper.so";
const CALL = "https://cal.com/trooper/setup-call";
const examples = [
  {
    name: "Sales",
    agent: "Pipeline researcher",
    icon: Search,
    color: "green",
    role: "Research accounts. Prepare better outreach.",
    prompt:
      "Research our next 20 accounts and draft a personal introduction for each. Keep everything in drafts for my review.",
    steps: [
      "Read the account list",
      "Research company and contact context",
      "Prepare personalized outreach",
    ],
    result: "Your next conversation starts here.",
    file: "Account research & outreach",
    type: "20 accounts · 20 email drafts",
    rows: [
      ["Northwind", "Hiring an infrastructure team", "Draft ready"],
      ["Acme", "New product launch", "Draft ready"],
      ["Meridian", "Expanding into Europe", "Draft ready"],
    ],
    response:
      "Research is ready, with a reason to reach out to every account. All emails are saved as drafts. Nothing has been sent.",
    href: "/teams/sales",
  },
  {
    name: "Engineering",
    agent: "Engineering teammate",
    icon: Code2,
    color: "blue",
    role: "From issue to a pull request you can review.",
    prompt:
      "Investigate the failing checkout test, fix the underlying issue, and open a pull request. Leave the merge to me.",
    steps: [
      "Read the issue and repository",
      "Reproduce the failure and implement a fix",
      "Run checks and prepare a pull request",
    ],
    result: "A fix, with the context to review it.",
    file: "Fix checkout validation",
    type: "Pull request · ready for review",
    rows: [
      ["Reproduction", "Failing checkout scenario", "Confirmed"],
      ["Implementation", "Validation boundary updated", "Complete"],
      ["Verification", "Checkout checks", "Passing"],
    ],
    response:
      "The fix is ready for review. I included the reproduction, implementation notes, and check results in the pull request. Nothing has been merged.",
    href: "/teams/engineering",
  },
  {
    name: "Operations",
    agent: "Operations teammate",
    icon: Layers3,
    color: "purple",
    role: "Turn recurring work into a reliable routine.",
    prompt:
      "Prepare this week’s team update from our project board and meeting notes. Flag blockers and suggest next steps.",
    steps: [
      "Read project updates and meeting notes",
      "Group progress, decisions, and blockers",
      "Prepare the weekly team brief",
    ],
    result: "The whole week, in one clear brief.",
    file: "Weekly team update",
    type: "Team brief · ready for review",
    rows: [
      ["Product", "Onboarding refresh", "On track"],
      ["Engineering", "Checkout improvements", "In review"],
      ["Operations", "Vendor renewal", "Needs input"],
    ],
    response:
      "Your weekly brief is ready. I highlighted the vendor renewal that needs a decision and linked each update to its source.",
    href: "/teams/operations",
  },
];

function Mark({ className = "" }: { className?: string }) {
  return (
    <img
      className={className}
      src="/images/trooper-logomark-128.webp"
      width="40"
      height="40"
      alt=""
    />
  );
}
function Action({
  children,
  href,
  secondary = false,
}: {
  children: ReactNode;
  href: string;
  secondary?: boolean;
}) {
  return (
    <a className={`${s.button} ${secondary ? s.secondary : ""}`} href={href}>
      {children}
      <ArrowUpRight size={16} aria-hidden />
    </a>
  );
}
function Dropdown({
  label,
  items,
}: {
  label: string;
  items: typeof featureNavItems;
}) {
  return (
    <HeadlessMenu as="div" className={s.dropdown}>
      <HeadlessMenu.Button className={s.navButton}>
        {label}
        <ChevronDown size={14} />
      </HeadlessMenu.Button>
      <HeadlessMenu.Items className={s.dropdownPanel}>
        {items.map((item) => (
          <HeadlessMenu.Item key={item.href}>
            {({ active }) => (
              <a className={active ? s.activeNavItem : ""} href={item.href}>
                <item.icon size={17} />
                <span>{item.title}</span>
              </a>
            )}
          </HeadlessMenu.Item>
        ))}
      </HeadlessMenu.Items>
    </HeadlessMenu>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className={s.header}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <div className={s.navInner}>
        <a href="/" className={s.logo} aria-label="Trooper home">
          <Mark />
          trooper
        </a>
        <nav className={s.desktopNav} aria-label="Primary">
          <Dropdown label="Product" items={featureNavItems} />
          <Dropdown label="Solutions" items={teamNavItems} />
          <a href="/plugin">Integrations</a>
          <a href="#pricing">Pricing</a>
          <a href="https://github.com/Trooper-AI/trooper-core">
            Open source
            <ArrowUpRight size={13} />
          </a>
        </nav>
        <div className={s.navActions}>
          <a className={s.signIn} href={APP}>
            Sign in
          </a>
          <a className={s.navCta} href={APP}>
            Get started
            <ArrowUpRight size={15} />
          </a>
          <button
            className={s.mobileToggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className={s.mobileNav}
          aria-label="Mobile navigation"
        >
          <a href="#product" onClick={() => setOpen(false)}>
            Product
          </a>
          <a href="/use-cases">Solutions</a>
          {primaryNavLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href={APP}>Sign in</a>
        </nav>
      )}
    </header>
  );
}
function Workspace() {
  const [selected, setSelected] = useState(0);
  const [replay, setReplay] = useState(0);
  const example = examples[selected];
  return (
    <div id="product" className={s.productWrap}>
      <div className={s.workspace}>
        <aside className={s.sidebar}>
          <div className={s.workspaceLogo}>
            <Mark />
            My workspace
            <ChevronDown size={14} />
          </div>
          <a className={s.newTask} href={APP}>
            <Plus size={15} />
            New task
          </a>
          <span className={s.sidebarLabel}>YOUR TEAM</span>
          {examples.map((item, i) => (
            <button
              key={item.name}
              className={`${s.agentButton} ${selected === i ? s.agentSelected : ""}`}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span className={`${s.agentIcon} ${s[item.color]}`}>
                <item.icon size={17} />
              </span>
              <span>
                {item.agent}
                <small>
                  {i === 0
                    ? "Outbound & research"
                    : i === 1
                      ? "Code & pull requests"
                      : "Projects & reporting"}
                </small>
              </span>
            </button>
          ))}
          <div className={s.sidebarBottom}>
            <span>
              <Repeat2 size={16} />
              Routines
            </span>
            <span>
              <Layers3 size={16} />
              Knowledge
            </span>
            <span>
              <Globe2 size={16} />
              Connected tools
            </span>
            <div>
              <span className={s.avatar}>Y</span>Your workspace
            </div>
          </div>
        </aside>
        <div className={s.workMain}>
          <div className={s.workspaceBar}>
            <span>
              <span className={s.statusDot} />
              {example.agent}
            </span>
            <span className={s.exampleLabel}>Interactive example</span>
          </div>
          <div className={s.mobileExamples} aria-label="Choose example">
            {examples.map((item, i) => (
              <button
                key={item.name}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className={s.conversation} key={`${selected}-${replay}`}>
            <div className={s.userMessage}>
              <span className={s.avatar}>Y</span>
              <div>
                <strong>You</strong>
                <p>{example.prompt}</p>
              </div>
            </div>
            <div className={s.agentMessage}>
              <span className={`${s.agentIcon} ${s[example.color]}`}>
                <example.icon size={18} />
              </span>
              <div>
                <strong>{example.agent}</strong>
                <div className={s.steps}>
                  {example.steps.map((step, i) => (
                    <span key={step} style={{ animationDelay: `${i * 140}ms` }}>
                      <CircleCheck size={14} />
                      {step}
                    </span>
                  ))}
                </div>
                <p>{example.response}</p>
                <div className={s.artifact}>
                  <div className={s.artifactHead}>
                    <FileText size={20} />
                    <span>
                      <strong>{example.file}</strong>
                      <small>{example.type}</small>
                    </span>
                    <span className={s.ready}>Ready for review</span>
                  </div>
                  <div className={s.resultRows}>
                    {example.rows.map((row) => (
                      <div key={row[0]}>
                        <strong>{row[0]}</strong>
                        <span>{row[1]}</span>
                        <small>{row[2]}</small>
                      </div>
                    ))}
                  </div>
                  <div className={s.artifactFoot}>
                    <LockKeyhole size={13} />
                    You approve what happens next
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.demoBottom}>
            <span>Give your team its next task.</span>
            <a href={APP} aria-label="Start a task in Trooper">
              <ArrowRight size={19} />
            </a>
          </div>
        </div>
        <aside className={s.contextPanel}>
          <div className={s.contextTitle}>
            Task context
            <Layers3 size={16} />
          </div>
          <span className={s.sidebarLabel}>CONNECTED TOOLS</span>
          {["Gmail", "GitHub", "Slack"].map((name) => (
            <div className={s.contextTool} key={name}>
              <span className={s.toolLetter}>{name[0]}</span>
              {name}
              <Check size={13} />
            </div>
          ))}
          <span className={s.sidebarLabel}>KNOWLEDGE</span>
          <div className={s.contextNote}>
            <FileText size={16} />
            <span>
              Company playbook<small>Shared with your team</small>
            </span>
          </div>
          <div className={s.contextNote}>
            <FileText size={16} />
            <span>
              Your preferences<small>Remembered across tasks</small>
            </span>
          </div>
          <div className={s.approvalNote}>
            <ShieldCheck size={21} />
            <strong>You're in control.</strong>
            <p>Review the work before it goes out.</p>
          </div>
        </aside>
      </div>
      <div className={s.demoCaption}>
        <span>
          <span className={s.statusDot} />
          One conversation. Finished work.
        </span>
        <button onClick={() => setReplay(replay + 1)}>
          <Play size={12} />
          Replay example
        </button>
      </div>
    </div>
  );
}

export default function LandingPage({
  integrations,
  pluginCount,
  loopCount,
}: {
  integrations: IntegrationTile[];
  pluginCount: number;
  loopCount: number;
}) {
  const [channel, setChannel] = useState("Slack");
  return (
    <div className={s.landing}>
      <a className={s.skipLink} href="#main-content">
        Skip to content
      </a>
      <Header />
      <div id="main-content">
        <section className={s.hero}>
          <div className={s.heroCopy}>
            <a href="/self-host" className={s.announcement}>
              <span className={s.statusDot} />
              Open source. Yours to run.
              <ArrowRight size={14} />
            </a>
            <h1>
              A little more team.
              <br />
              <span>A lot more done.</span>
            </h1>
            <p>
              Meet the AI teammates that work across your tools,
              <br className={s.desktopBreak} /> remember the details, and take
              tasks off your plate.
            </p>
            <div className={s.actions}>
              <Action href={APP}>Get started</Action>
              <Action href={CALL} secondary>
                Book a demo
              </Action>
            </div>
            <div className={s.heroNote}>
              Free to self-host<span>·</span>Bring your own model keys
            </div>
          </div>
          <Workspace />
        </section>
        <div className={s.integrationStrip}>
          <p>Right at home in the tools you already use</p>
          <div>
            {integrations.slice(0, 6).map((item) => (
              <a key={item.slug} href={item.href}>
                <img
                  src={item.logo}
                  alt=""
                  width="24"
                  height="24"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.visibility = "hidden";
                  }}
                />
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <section className={`${s.section} ${s.teamSection}`} id="solutions">
          <div className={s.sectionHeading}>
            <span className={s.eyebrow}>A teammate for the work</span>
            <h2>
              Delegate the task.
              <br />
              <span>Keep the momentum.</span>
            </h2>
            <p>
              Give each Trooper a role and the context it needs. They do the
              legwork and bring the result back to you.
            </p>
          </div>
          <div className={s.teamCards}>
            {examples.map((item, i) => (
              <a className={s.teamCard} href={item.href} key={item.name}>
                <div className={`${s.teamVisual} ${s[item.color]}`}>
                  <span className={s.visualLabel}>{item.name} teammate</span>
                  <div className={s.miniArtifact}>
                    <span className={`${s.agentIcon} ${s[item.color]}`}>
                      <item.icon size={22} />
                    </span>
                    <strong>{item.file}</strong>
                    <span>{item.type}</span>
                    <div>
                      <CircleCheck size={14} />
                      Ready for your review
                    </div>
                  </div>
                </div>
                <div className={s.teamCardCopy}>
                  <h3>{item.role}</h3>
                  <p>
                    {i === 0
                      ? "Research prospects and draft relevant outreach, with every message ready for your approval."
                      : i === 1
                        ? "Investigate issues, write the fix, and run the checks. You make the call on what ships."
                        : "Collect updates, surface blockers, and keep the team in sync without chasing every thread."}
                  </p>
                  <span>
                    Explore {item.name.toLowerCase()}
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            ))}
          </div>
          <a href="/use-cases" className={s.textLink}>
            Find a teammate for your team
            <ArrowRight size={16} />
          </a>
        </section>
        <section className={`${s.section} ${s.splitSection}`}>
          <div className={s.sectionHeading}>
            <span className={s.eyebrow}>Context that carries forward</span>
            <h2>
              Less explaining.
              <br />
              <span>More understanding.</span>
            </h2>
            <p>
              Your documents, tools, and team’s way of working, in one shared
              context. Every task starts with more than a blank chat.
            </p>
            <a className={s.textLink} href="/features/persistent-memory">
              Explore shared memory
              <ArrowRight size={16} />
            </a>
            <div className={s.featurePoints}>
              <span>
                <Layers3 size={19} />
                <div>
                  <h3>Your company knowledge</h3>
                  <p>Bring the files and decisions that shape your work.</p>
                </div>
              </span>
              <span>
                <Sparkles size={19} />
                <div>
                  <h3>Your way of doing things</h3>
                  <p>
                    Keep instructions and reusable skills close to every task.
                  </p>
                </div>
              </span>
            </div>
          </div>
          <div className={s.knowledgeVisual}>
            <div className={s.panelTop}>
              <Layers3 size={18} />
              Company knowledge<span>Shared</span>
            </div>
            <div className={s.knowledgeFiles}>
              {[
                ["Brand voice", "Tone, style, and the words we use"],
                [
                  "Product playbook",
                  "Features, positioning, and customer context",
                ],
                ["Team routines", "The way your team gets work done"],
              ].map(([name, desc]) => (
                <div key={name}>
                  <span>
                    <FileText size={20} />
                  </span>
                  <div>
                    <strong>{name}</strong>
                    <p>{desc}</p>
                  </div>
                  <Check size={16} />
                </div>
              ))}
            </div>
            <div className={s.knowledgeConnection}>
              <span />
              <Layers3 size={23} />
              <span />
            </div>
            <div className={s.knowledgeAgents}>
              {examples.map((item) => (
                <span key={item.name}>
                  <span className={`${s.agentIcon} ${s[item.color]}`}>
                    <item.icon size={19} />
                  </span>
                  {item.name}
                </span>
              ))}
            </div>
            <p className={s.visualFootnote}>
              One shared context. A whole team that gets it.
            </p>
          </div>
        </section>
        <section className={`${s.section} ${s.connectedSection}`}>
          <div className={s.sectionHeading}>
            <span className={s.eyebrow}>Works where you work</span>
            <h2>
              Your tools.
              <br />
              <span>Now with teammates.</span>
            </h2>
            <p>
              Connect your existing stack. Let Trooper find the context, do the
              work, and bring it back to the conversation.
            </p>
            <a href="/plugin" className={s.textLink}>
              Explore {pluginCount.toLocaleString("en-US")} plugins
              <ArrowRight size={16} />
            </a>
          </div>
          <div className={s.integrationGrid}>
            {integrations.slice(0, 12).map((item) => (
              <a href={item.href} key={item.slug}>
                <img
                  src={item.logo}
                  alt=""
                  width="32"
                  height="32"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.visibility = "hidden";
                  }}
                />
                <span>{item.name}</span>
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </section>
        <section
          className={`${s.section} ${s.splitSection} ${s.channelSection}`}
        >
          <div className={s.channelVisual}>
            <div className={s.panelTop}>
              <MessageSquare size={18} />
              {channel}
              <span>Example conversation</span>
            </div>
            <div className={s.channelConversation}>
              <div className={s.userMessage}>
                <span className={s.avatar}>Y</span>
                <div>
                  <strong>
                    You<small>9:02 AM</small>
                  </strong>
                  <p>@Trooper, what needs my attention today?</p>
                </div>
              </div>
              <div className={s.agentMessage}>
                <Mark />
                <div>
                  <strong>
                    Trooper<small>9:03 AM</small>
                  </strong>
                  <p>
                    Your morning brief is ready. Three things need a decision:
                  </p>
                  <ul>
                    <li>Review the outreach drafts.</li>
                    <li>Approve the checkout pull request.</li>
                    <li>Confirm next steps on the vendor renewal.</li>
                  </ul>
                  <span className={s.channelAttachment}>
                    <FileText size={16} />
                    Morning brief <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </div>
            <div className={s.channelInput}>
              The work comes back to you.
              <MessageSquare size={17} />
            </div>
          </div>
          <div className={s.sectionHeading}>
            <span className={s.eyebrow}>Keep the conversation going</span>
            <h2>
              Same team.
              <br />
              <span>Wherever you are.</span>
            </h2>
            <p>
              Stay in the loop from your desktop or your favorite messaging app.
              Pick up the conversation with its context intact.
            </p>
            <div
              className={s.channelChoices}
              aria-label="Preview a messaging channel"
            >
              {["Slack", "Telegram", "Email"].map((name) => (
                <button
                  key={name}
                  aria-pressed={channel === name}
                  onClick={() => setChannel(name)}
                >
                  {name}
                  <ArrowUpRight size={14} />
                </button>
              ))}
            </div>
            <a href="/channels" className={s.textLink}>
              Explore all channels
              <ArrowRight size={16} />
            </a>
            <div className={s.download}>
              <HeroDownloadButtons size="md" variant="outline" />
            </div>
          </div>
        </section>
        <section className={s.controlBand}>
          <div className={s.section}>
            <div className={s.controlHeading}>
              <span className={s.eyebrow}>
                More capable. Still accountable.
              </span>
              <h2>
                Give your team room to work.
                <br />
                <span>Keep the controls that matter.</span>
              </h2>
            </div>
            <div className={s.controlCards}>
              <a href="/loops">
                <Repeat2 />
                <h3>Make good work repeatable.</h3>
                <p>
                  Turn an approved process into a loop. Run it again with the
                  same instructions and a clear stopping point.
                </p>
                <span>
                  Explore {loopCount} loops
                  <ArrowRight size={16} />
                </span>
              </a>
              <a href="/features/task-execution">
                <ShieldCheck />
                <h3>Your approval. Your call.</h3>
                <p>
                  Set the boundaries, review the results, and decide when a task
                  is ready for its next step.
                </p>
                <span>
                  Explore task execution
                  <ArrowRight size={16} />
                </span>
              </a>
              <a href="/self-host">
                <Terminal />
                <h3>Your keys. Your environment.</h3>
                <p>
                  Run Trooper on your own machine or choose managed cloud.
                  Connect your model keys directly.
                </p>
                <span>
                  Explore self-hosting
                  <ArrowRight size={16} />
                </span>
              </a>
            </div>
            <div className={s.controlFoot}>
              <span>
                <Code2 size={17} />
                Build workflows into your own tools.
              </span>
              <a href="/loops">
                Explore the Loop API
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
        <section id="pricing" className={`${s.section} ${s.pricing}`}>
          <span className={s.eyebrow}>Start small. Make room for more.</span>
          <SimplePricing />
        </section>
        <section className={`${s.section} ${s.faq}`}>
          <FAQ />
        </section>
        <div className={s.founderNote}>
          <img
            src="/images/founder-portrait.png"
            alt="Vaibhav, Trooper founder"
            width="48"
            height="48"
            loading="lazy"
          />
          <div>
            <strong>Let’s put your first teammate to work.</strong>
            <p>Book a setup call with Vaibhav, Trooper’s founder.</p>
          </div>
          <a href={CALL} className={s.textLink}>
            Meet the founder
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
