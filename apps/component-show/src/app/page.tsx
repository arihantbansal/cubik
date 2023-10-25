import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"/com/avatar"}>
        <button className="h-8 bg-violet-500 text-white px-7 rounded">
          Avatar
        </button>
      </Link>
    </main>
  );
}
