import Link from "next/link";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Squares Design System",
  description: "The Design System that powers Cubik",
  openGraph: {
    images: [
      "https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/f44a705b-fa53-45d3-9a44-937593ac6a00/public",
    ],
  },
  twitter: {
    title: "Squares Design System",
    card: "summary_large_image",
    images: [
      "https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/f44a705b-fa53-45d3-9a44-937593ac6a00/public",
    ],
  },
};

export default function Home() {
  return (
    <main className="flex  gap-5 items-center flex-wrap justify-center p-24">
      <Link href={'/com/avatar'}>
        <button className="h-8 bg-violet-500 dark:bg-red-500 text-white px-7 rounded">
          Avatar
        </button>
      </Link>
      <Link href={'/com/tag'}>
        <button className="h-8 bg-violet-500 dark:bg-red-500 text-white px-7 rounded">
          Tag
        </button>
      </Link>
      <Link href={'/com/tabs'}>
        <button className="h-8 bg-violet-500 dark:bg-red-500 text-white px-7 rounded">
          Tabs
        </button>
      </Link>
      <Link href={'/com/alerts'}>
        <button className="h-8 bg-violet-500 dark:bg-red-500 text-white px-7 rounded">
          Alerts
        </button>
      </Link>
      <Link href={'/com/subhead'}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded dark:bg-red-500">
          Sub Head
        </button>
      </Link>
      <Link href={'/com/subhead'}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded dark:bg-red-500">
          Sub Head
        </button>
      </Link>
      <Link href={'/com/modal'}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded">
          Modal
        </button>
      </Link>
      <Link href={'/com/button'}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded">
          Button
        </button>
      </Link>
      <Link href={'/com/form'}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded">
          Forms
        </button>
      </Link>
    </main>
  );
}
