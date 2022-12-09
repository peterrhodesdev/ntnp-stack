import Link from "next/link";
import React from "react";

type Props = {
  title: string;
};

const links = [
  { text: "Home", href: "/" },
  { text: "Examples", href: "/examples" },
];

export default function Header({ title }: Props) {
  return (
    <div className="p-1 bg-slate-100">
      <nav>
        {title}
        {links.map((link) => (
          <React.Fragment key={link.text}>
            {" | "}
            <Link href={link.href}>{link.text}</Link>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
