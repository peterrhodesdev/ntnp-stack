import Link from "next/link";

export default function Header() {
  return (
    <div className="p-1 bg-slate-100">
      <nav>
        <Link href="/">Home</Link>
      </nav>
    </div>
  );
}
