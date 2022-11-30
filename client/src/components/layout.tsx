import Footer from "./footer";
import Header from "./header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen prose prose-sm prose-slate max-w-none">
      <Header />
      <div className="p-4">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
