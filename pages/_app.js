import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-white">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
