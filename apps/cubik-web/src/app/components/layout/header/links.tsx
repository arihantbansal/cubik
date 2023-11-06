'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@cubik/ui/lib/utils';

const Links = () => {
  const path = usePathname();

  const isActiveRoute = (route: string): boolean => {
    return path === route;
  };

  return (
    <>
      <div className="hidden items-center justify-start gap-6 lg:flex">
        <Link
          className={cn(
            isActiveRoute('/projects')
              ? 'text-[var(--white)] font-bold text-[16px] leading-6'
              : 'text-[var(--color-neutral-300)] font-medium text-[16px] leading-6',
          )}
          href="/projects"
        >
          Projects
        </Link>
        <Link
          className={cn(
            isActiveRoute('/grants')
              ? 'text-[var(--white)] font-bold text-[16px] leading-6'
              : 'text-[var(--color-neutral-300)] font-medium text-[16px] leading-6',
          )}
          href="/grants"
        >
          Grants
        </Link>
        <Link
          className={cn(
            isActiveRoute('/communities')
              ? 'text-[var(--white)] font-bold text-[16px] leading-6'
              : 'text-[var(--color-neutral-300)] font-medium text-[16px] leading-6',
          )}
          href="/communities"
        >
          Communities
        </Link>
        <Link
          className={cn(
            isActiveRoute('/lLeaderboard')
              ? 'text-[var(--white)] font-bold text-[16px] leading-6'
              : 'text-[var(--color-neutral-300)] font-medium text-[16px] leading-6',
          )}
          href="/leaderboard"
        >
          Leaderboard
        </Link>
      </div>
    </>
  );
};

export default Links;
