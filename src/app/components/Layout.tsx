import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="antialiased flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col flex-grow">{children}</main>
      <Footer/>
    </div>
  );
}
