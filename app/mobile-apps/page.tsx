import { GetMetada } from '@/lib/page-metadata';
import AppsClient from './apps-client';

export const metadata = GetMetada('mobileApps');

export default function MobileAppsPage() {
  return <AppsClient />;
}
