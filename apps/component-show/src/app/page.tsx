import Link from "next/link";

export default function Home() {
  return (
    <main className="flex  gap-5 items-center flex-wrap justify-center p-24">
      <Link href={"/com/avatar"}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded">
          Avatar
        </button>
      </Link>
      <Link href={"/com/tag"}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded">
          Tag
        </button>
      </Link>
      <Link href={"/com/tabs"}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded">
          Tabs
        </button>
      </Link>
      <Link href={"/com/alerts"}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded">
          Alerts
        </button>
      </Link>
      <Link href={"/com/subhead"}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded">
          Sub Head
        </button>
      </Link>
      <Link href={"/com/subhead"}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded">
          Sub Head
        </button>
      </Link>
      <Link href={"/com/modal"}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded">
          Modal
        </button>
      </Link>
      <Link href={"/com/button"}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded">
          Button
        </button>
      </Link>
      <Link href={"/com/form"}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded">
          Forms
        </button>
      </Link>
    </main>
  );
}
