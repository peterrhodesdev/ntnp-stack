import Head from "next/head";
import Footer from "./footer";
import Header from "./header";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function Layout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div
        data-testid="container"
        className="min-h-screen prose prose-sm prose-slate max-w-none"
      >
        <Header title={title} />
        <div className="p-4">
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
}
