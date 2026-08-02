import type { LucideIcon } from 'lucide-react';
import {
  Phone,
  Calendar,
  MessageSquare,
  Search,
  FileText,
  Users,
  Code2,
  Shield,
  Megaphone,
  DollarSign,
  ClipboardList,
  Mail,
} from 'lucide-react';

export type OldStackTool = {
  name: string;
  price: number;
};

export type OldStackNote = {
  text: string;
  value: string;
};

export type OldStackStepIcon =
  | 'phone'
  | 'calendar'
  | 'message'
  | 'search'
  | 'file'
  | 'users'
  | 'code'
  | 'shield'
  | 'megaphone'
  | 'dollar'
  | 'clipboard'
  | 'mail';

export type OldStackStep = {
  title: string;
  detail: string;
  icon: OldStackStepIcon;
  tags?: string[];
};

export type OldStackContent = {
  eyebrow: string;
  headline: string;
  headlineEmphasis: string;
  lede: string;
  tools: OldStackTool[];
  notes: OldStackNote[];
  timeLabel: string;
  footnote: string;
  dividerLabel: string;
  agentLabel: string;
  userAsk: string;
  agentAck: string;
  steps: OldStackStep[];
  pendingTitle: string;
  pendingDetail: string;
  closingLine: string;
  closingCta: string;
  userHire: string;
  trooperPriceLabel: string;
};

export const OLD_STACK_ICONS: Record<OldStackStepIcon, LucideIcon> = {
  phone: Phone,
  calendar: Calendar,
  message: MessageSquare,
  search: Search,
  file: FileText,
  users: Users,
  code: Code2,
  shield: Shield,
  megaphone: Megaphone,
  dollar: DollarSign,
  clipboard: ClipboardList,
  mail: Mail,
};

/** Absolute positions for the scattered tool cards (10 slots). */
export const TOOL_POSITIONS = [
  {
    pos: 'left-[8px] top-0 z-[9] rotate-[-3deg]',
    posLg: 'lg:left-[2px] lg:top-0 lg:z-[9] lg:rotate-[-3.5deg]',
  },
  {
    pos: 'right-[4px] top-[14px] z-[8] rotate-[2.5deg]',
    posLg: 'lg:right-auto lg:left-[148px] lg:top-[14px] lg:z-[8] lg:rotate-[2.5deg]',
  },
  {
    pos: 'left-[18px] top-[80px] z-[7] rotate-[1.5deg]',
    posLg: 'lg:left-[34px] lg:top-[78px] lg:z-[7] lg:rotate-[1.5deg]',
  },
  {
    pos: 'right-[12px] top-[94px] z-[6] rotate-[-2deg]',
    posLg: 'lg:right-auto lg:left-[176px] lg:top-[96px] lg:z-[6] lg:rotate-[-2deg]',
  },
  {
    pos: 'left-[6px] top-[160px] z-[5] rotate-[2deg]',
    posLg: 'lg:left-[6px] lg:top-[158px] lg:z-[5] lg:rotate-[2deg]',
  },
  {
    pos: 'right-[6px] top-[178px] z-[4] rotate-[-1.5deg]',
    posLg: 'lg:right-auto lg:left-[150px] lg:top-[176px] lg:z-[4] lg:rotate-[-1.5deg]',
  },
  {
    pos: 'left-[14px] top-[242px] z-[3] rotate-[-2.5deg]',
    posLg: 'lg:left-[48px] lg:top-[236px] lg:z-[3] lg:rotate-[-2.5deg]',
  },
  {
    pos: 'right-[10px] top-[258px] z-[2] rotate-[3deg]',
    posLg: 'lg:right-auto lg:left-[188px] lg:top-[254px] lg:z-[2] lg:rotate-[3deg]',
  },
  {
    pos: 'left-[10px] top-[324px] z-[1] rotate-[1deg]',
    posLg: 'lg:left-[14px] lg:top-[316px] lg:z-[1] lg:rotate-[1deg]',
  },
  {
    pos: 'right-[8px] top-[338px] z-[1] rotate-[-3deg]',
    posLg: 'lg:right-auto lg:left-[158px] lg:top-[334px] lg:z-[1] lg:rotate-[-3deg]',
  },
] as const;

export const NOTE_POSITIONS = [
  'left-[36px] top-[70px] z-[11] rotate-[4deg] lg:left-[114px] lg:top-[60px]',
  'left-[-2px] top-[230px] z-[11] rotate-[-4deg] lg:left-[-6px] lg:top-[212px]',
  'left-[93px] top-[390px] z-[11] rotate-[3.5deg] lg:left-[120px] lg:top-[300px]',
] as const;

export function sumTools(tools: OldStackTool[]): number {
  return tools.reduce((sum, t) => sum + t.price, 0);
}
