import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full">
      <div className="flex w-full flex-col p-12">{children}</div>
    </main>
  );
}
