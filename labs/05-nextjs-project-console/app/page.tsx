import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <p className="eyebrow">Next.js Lab</p>
      <h1>Medical Implementation Console</h1>
      <p>
        本页默认是 Server Component。
      </p>

      <Link href="/projects">
        Open Projects
      </Link>
    </main>
  );
}
