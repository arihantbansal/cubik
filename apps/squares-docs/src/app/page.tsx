import Link from "next/link";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Squares Design System",
  description: "The Design System that powers Cubik",
  openGraph: {
    images: [
      "https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/ea3795f8-3c4a-4b75-ed4e-5cd423cf0300/public",
    ],
  },
  twitter: {
    title: "Squares Design System",
    card: "summary_large_image",
    images: [
      "https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/ea3795f8-3c4a-4b75-ed4e-5cd423cf0300/public",
    ],
  },
};

export default function Home() {
  return (
    <main className="flex  flex-wrap items-center justify-center gap-5 p-24">
      <Link href={'/com/avatar'}>
        <button className="h-8 rounded bg-violet-500 px-7 text-white dark:bg-red-500">
          Avatar
        </button>
      </Link>
      <Link href={'/com/tag'}>
        <button className="h-8 rounded bg-violet-500 px-7 text-white dark:bg-red-500">
          Tag
        </button>
      </Link>
      <Link href={'/com/tabs'}>
        <button className="h-8 rounded bg-violet-500 px-7 text-white dark:bg-red-500">
          Tabs
        </button>
      </Link>
      <Link href={'/com/alerts'}>
        <button className="h-8 rounded bg-violet-500 px-7 text-white dark:bg-red-500">
          Alerts
        </button>
      </Link>
      <Link href={'/com/subhead'}>
        <button className="h-8 rounded bg-violet-500 px-7 text-white dark:bg-red-500">
          Sub Head
        </button>
      </Link>
      <Link href={'/com/subhead'}>
        <button className="h-8 rounded bg-violet-500 px-7 text-white dark:bg-red-500">
          Sub Head
        </button>
      </Link>
      <Link href={'/com/modal'}>
        <button className="h-8 rounded bg-violet-500 px-7 text-white">
          Modal
        </button>
      </Link>
      <Link href={'/com/button'}>
        <button className="h-8 rounded bg-violet-500 px-7 text-white">
          Button
        </button>
      </Link>
      <Link href={'/com/form'}>
        <button className="h-8 rounded bg-violet-500 px-7 text-white">
          Forms
        </button>
      </Link>
    </main>
  );
}
