import Link from "next/link";

const divider = " | ";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <div className="p-1 bg-slate-100">
      <nav>
        {title}
        {divider}
        <Link href="/">Home</Link>
      </nav>
    </div>
  );
}
