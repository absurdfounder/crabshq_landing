'use client';

import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TROOPER_DEMO as C } from './demoTheme';

/**
 * The demo's markdown surface, ported from the app's
 * `src/components/ArtifactMarkdownPreview.jsx` so agent deliverables render
 * with the same headings, tables, lists and code blocks the product produces.
 *
 * The app expresses this through Tailwind tokens; those are resolved to the
 * demo palette here because the demo canvas is inline-styled and sits outside
 * the app's theme.
 */

const MD_CSS = `
.demo-md { font-size: 13px; line-height: 1.65; color: ${C.textMuted}; }
.demo-md > :first-child { margin-top: 0; }
.demo-md p { margin: 12px 0; line-height: 1.65; }
.demo-md h1 { margin: 24px 0 12px; padding-bottom: 8px; border-bottom: 1px solid ${C.border}; font-size: 20px; font-weight: 700; color: ${C.text}; letter-spacing: -0.01em; }
.demo-md h2 { margin: 20px 0 8px; font-size: 17px; font-weight: 600; color: ${C.text}; }
.demo-md h3 { margin: 16px 0 4px; font-size: 15px; font-weight: 600; color: #44403c; }
.demo-md h4 { margin: 12px 0 4px; font-size: 13px; font-weight: 600; color: #44403c; }
.demo-md ul { margin: 12px 0; padding-left: 24px; list-style: disc; }
.demo-md ol { margin: 12px 0; padding-left: 24px; list-style: decimal; }
.demo-md li { margin-bottom: 4px; line-height: 1.65; }
.demo-md li::marker { color: ${C.textSubtle}; }
.demo-md strong { font-weight: 600; color: ${C.text}; }
.demo-md em { font-style: italic; }
.demo-md blockquote { margin: 12px 0; padding: 4px 0 4px 16px; border-left: 4px solid #d6d3d1; font-style: italic; color: ${C.textMuted}; }
.demo-md a { color: ${C.brand}; text-decoration: underline; }
.demo-md hr { margin: 24px 0; border: none; border-top: 1px solid ${C.border}; }
.demo-md img { max-width: 100%; border-radius: 8px; border: 1px solid ${C.border}; }
.demo-md code { border-radius: 4px; background: #F5F5F4; padding: 2px 5px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.85em; color: #292524; }
.demo-md pre { margin: 12px 0; overflow-x: auto; border-radius: 8px; background: #F5F5F4; padding: 12px 14px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11.5px; line-height: 1.6; color: #292524; }
.demo-md pre code { background: none; padding: 0; font-size: inherit; }
.demo-md table { min-width: 100%; border-collapse: collapse; font-size: 12px; }
.demo-md thead { border-bottom: 1px solid ${C.border}; background: rgba(245,245,244,0.6); }
.demo-md tr { border-bottom: 1px solid #f5f5f4; }
.demo-md tr:last-child { border-bottom: none; }
.demo-md th { white-space: nowrap; padding: 8px 12px; text-align: left; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: ${C.textMuted}; }
.demo-md td { padding: 8px 12px; vertical-align: top; color: #44403c; }
.demo-md input[type="checkbox"] { margin-right: 6px; accent-color: ${C.brand}; }
.demo-md li:has(> input[type="checkbox"]) { list-style: none; margin-left: -20px; }
`;

/** Wide content needs its own scroller so the panel never scrolls sideways. */
function TableWrapper({ children }: { children?: ReactNode }) {
  return (
    <div style={{ margin: '16px 0', overflowX: 'auto', borderRadius: 8, border: `1px solid ${C.border}` }}>
      <table>{children}</table>
    </div>
  );
}

export function DemoMarkdownBody({ content }: { content: string }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MD_CSS }} />
      <div className="demo-md">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            table: TableWrapper,
            // react-markdown nests <code> in <pre>; the CSS above styles both,
            // so the default <pre> passthrough is what we want.
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </>
  );
}
