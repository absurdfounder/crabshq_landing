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

export function sumTools(tools: OldStackTool[]): number {
  return tools.reduce((sum, t) => sum + t.price, 0);
}
