export type DiffLineType = 'header' | 'addition' | 'deletion' | 'context';

export type DiffLine = {
  type: DiffLineType;
  content: string;
  oldLine?: number;
  newLine?: number;
};

export type DiffHunk = {
  header: string;
  lines: DiffLine[];
};

export type DiffFile = {
  oldPath: string;
  newPath: string;
  hunks: DiffHunk[];
  additions: number;
  deletions: number;
};

function parseUnifiedDiff(raw: string): DiffFile[] {
  const text = String(raw || '').replace(/\r\n/g, '\n');
  const lines = text.split('\n');
  const files: DiffFile[] = [];
  let currentFile: DiffFile | null = null;
  let currentHunk: DiffHunk | null = null;
  let oldLine = 0;
  let newLine = 0;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (line.startsWith('--- ')) {
      const nextLine = lines[index + 1];
      if (nextLine?.startsWith('+++ ')) {
        currentFile = {
          oldPath: line.replace(/^---\s+/, '').replace(/^a\//, '').trim(),
          newPath: nextLine.replace(/^\+\+\+\s+/, '').replace(/^b\//, '').trim(),
          hunks: [],
          additions: 0,
          deletions: 0,
        };
        files.push(currentFile);
        currentHunk = null;
        index += 1;
        continue;
      }
    }

    const hunkMatch = line.match(/^@@\s+-(\d+)(?:,\d+)?\s+\+(\d+)(?:,\d+)?\s+@@/);
    if (hunkMatch) {
      oldLine = Number(hunkMatch[1]);
      newLine = Number(hunkMatch[2]);
      currentHunk = { header: line, lines: [{ type: 'header', content: line }] };
      if (!currentFile) {
        currentFile = { oldPath: '', newPath: '', hunks: [], additions: 0, deletions: 0 };
        files.push(currentFile);
      }
      currentFile.hunks.push(currentHunk);
      continue;
    }

    if (!currentFile || !currentHunk) continue;

    if (line.startsWith('+') && !line.startsWith('+++ ')) {
      currentHunk.lines.push({ type: 'addition', content: line.slice(1), newLine });
      currentFile.additions += 1;
      newLine += 1;
    } else if (line.startsWith('-') && !line.startsWith('--- ')) {
      currentHunk.lines.push({ type: 'deletion', content: line.slice(1), oldLine });
      currentFile.deletions += 1;
      oldLine += 1;
    } else {
      const normalized = line.startsWith(' ') ? line.slice(1) : line;
      currentHunk.lines.push({ type: 'context', content: normalized, oldLine, newLine });
      oldLine += 1;
      newLine += 1;
    }
  }

  if (files.length === 0 && text.trim()) {
    const fallbackLines: DiffLine[] = text.split('\n').map((l) => {
      if (l.startsWith('+') && !l.startsWith('+++')) return { type: 'addition' as const, content: l.slice(1) };
      if (l.startsWith('-') && !l.startsWith('---')) return { type: 'deletion' as const, content: l.slice(1) };
      return { type: 'context' as const, content: l };
    });
    files.push({
      oldPath: '',
      newPath: '',
      hunks: [{ header: '', lines: fallbackLines }],
      additions: fallbackLines.filter((l) => l.type === 'addition').length,
      deletions: fallbackLines.filter((l) => l.type === 'deletion').length,
    });
  }

  return files;
}

export function displayDiffPath(file: DiffFile): string {
  if (file.newPath && file.newPath !== '/dev/null') return file.newPath;
  if (file.oldPath && file.oldPath !== '/dev/null') return file.oldPath;
  return 'Changes';
}

export function diffFileBasename(path = ''): string {
  const value = String(path || '').trim();
  if (!value || value === 'Changes') return value || 'Changes';
  const parts = value.split('/').filter(Boolean);
  return parts[parts.length - 1] || value;
}

export function diffFileFolder(path = ''): string {
  const parts = String(path || '').split('/').filter(Boolean);
  if (parts.length <= 1) return '';
  return parts.slice(0, -1).join('/');
}

export function parseDemoDiff(raw: string): DiffFile[] {
  return parseUnifiedDiff(raw);
}

export function addressBarFromUrl(pageUrl = ''): string {
  const u = String(pageUrl || '').trim();
  if (!u) return 'Browser';
  try {
    const parsed = new URL(u.startsWith('http') ? u : `https://${u}`);
    const host = parsed.hostname.replace(/^www\./, '');
    const path = parsed.pathname + parsed.search;
    if (path && path !== '/') {
      const short = path.length > 32 ? `${path.slice(0, 30)}…` : path;
      return `${host}${short}`;
    }
    return host;
  } catch {
    return u.length > 56 ? `${u.slice(0, 54)}…` : u;
  }
}
