import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Farm Output", href: "/farm-output" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Admin", href: "/admin" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight text-brand-700">
          FarmFlow CRM
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-brand-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://wa.me/1234567890"}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-400/20 transition hover:bg-brand-700"
        >
          Order on WhatsApp
        </a>
      </div>
    </header>
  );
}
