import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/70 sm:p-12">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-800">
            Fresh from Our Farm to Your Table
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Fresh from Our Farm to Your Table
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Premium Onions, Watermelons, Sweet Melons, Capsicums & Tandora — delivered with care, traceability, and reliable logistics for restaurants, markets, and home cooks.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
              Explore Our Produce
            </Link>
            <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              Contact Us Today
            </a>
          </div>
          <div className="mt-10 rounded-3xl bg-emerald-50 p-6 text-slate-700">
            <p className="text-sm uppercase tracking-[0.2em] font-semibold text-emerald-800">
              Farm Fresh • Chemical-Free • Daily Harvest • Nationwide Delivery
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Onion", subtitle: "Crisp red & white varieties" },
            { title: "Watermelon", subtitle: "Sweet and juicy" },
            { title: "Sweet Melon", subtitle: "Premium quality" },
            { title: "Red Capsicum", subtitle: "Bright and crunchy" },
            { title: "Green Capsicum", subtitle: "Garden-fresh supply" },
            { title: "Tandora", subtitle: "Fresh and nutritious" },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-slate-600">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
