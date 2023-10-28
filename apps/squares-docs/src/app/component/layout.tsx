import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full">
      <div className="flex flex-col w-full p-12">{children}</div>
    </main>
  );
}
