import Link from 'next/link';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Squares Design System',
  description: 'The Design System that powers Cubik',
  openGraph: {
    images: [
      'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/ea3795f8-3c4a-4b75-ed4e-5cd423cf0300/public',
    ],
  },
  twitter: {
    title: 'Squares Design System',
    card: 'summary_large_image',
    images: [
      'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/ea3795f8-3c4a-4b75-ed4e-5cd423cf0300/public',
    ],
  },
};

export default function Home() {
  return (
    <main className="flex  flex-wrap items-center justify-center gap-5 p-24"></main>
  );
}
