'use client';

import { useUser } from '@/app/context/user';

import { AdminProjectEmptyState } from './AdminViewEmptyPage';
import { VisitorProjectEmptyState } from './VisitorViewEmptyPage';

interface Props {
  username: string;
}
export const EmptyState = ({ username }: Props) => {
  const { user } = useUser();
  if (user && user?.username === username) {
    return <AdminProjectEmptyState />;
  }
  return <VisitorProjectEmptyState />;
};
