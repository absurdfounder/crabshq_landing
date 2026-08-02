'use client';

import OldStackComparison from '@/components/marketing/OldStackComparison';
import { getResellersOldStack } from '@/lib/oldStackContent';

export default function ResellersOldStack() {
  return <OldStackComparison content={getResellersOldStack()} bgClass="bg-white" />;
}
