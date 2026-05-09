import HeroSection from "../components/HeroSection";
import ProductShowcase from "../components/ProductShowcase";
import FarmOutputTable from "../components/FarmOutputTable";

export default function Home() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Direct from Farm", description: "Traceable harvests from seed to delivery." },
            { title: "Consistent Quality", description: "Premium produce sorted for every order." },
            { title: "Freshness Guaranteed", description: "Daily picks and same-day shipping available." },
            { title: "Reliable Logistics", description: "Bulk delivery for restaurants, markets and hotels." },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      <ProductShowcase />
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-4">
          {[
            { title: "Direct from Farm", description: "Every delivery begins in our fields with visible traceability." },
            { title: "Consistent Quality & Supply", description: "Reliable availability for restaurants, supermarkets and wholesale buyers." },
            { title: "Freshness Guaranteed", description: "Carefully packed and shipped to preserve texture and flavor." },
            { title: "Trusted Logistics", description: "Custom packaging, transport and delivery tailored to your needs." },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Farm Gallery</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">See our fields, harvest, and packing in action</h2>
          </div>
          <p className="max-w-2xl text-slate-600">Real farm moments highlight our care, team, and commitment to fresh produce every season.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            "Fields at sunrise",
            "Harvesting fresh produce",
            "Packing premium vegetables",
            "Farm team in action",
          ].map((photo) => (
            <div key={photo} className="rounded-3xl bg-emerald-50 p-6 text-slate-800 shadow-sm">
              <div className="h-40 rounded-3xl bg-gradient-to-br from-emerald-300 via-emerald-400 to-slate-300" />
              <p className="mt-4 text-lg font-semibold">{photo}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Testimonials</h2>
          <div className="mt-6 space-y-6">
            {[
              { name: "Spice Avenue Restaurant", quote: "Onestop Veggies delivers fresh, consistent quality every week." },
              { name: "Metro Market", quote: "Their produce stays crisp longer and our customers notice the difference." },
            ].map((item) => (
              <div key={item.name} className="rounded-3xl bg-slate-50 p-5">
                <p className="text-slate-700">“{item.quote}”</p>
                <p className="mt-3 text-sm font-semibold text-slate-900">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-brand-600 p-8 text-white shadow-xl shadow-brand-500/20">
          <h2 className="text-2xl font-semibold">Ready to order fresh vegetables in bulk?</h2>
          <p className="mt-4 text-slate-100 leading-7">Whether you operate a restaurant, supermarket, or cater events, we make bulk ordering simple and dependable.</p>
          <a
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-md shadow-brand-900/10"
          >
            Request a quote
          </a>
        </div>
      </section>
      <FarmOutputTable />
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Ready to order?</h2>
        <p className="mt-3 text-slate-600">Visit the contact page to request a quote, confirm availability, or schedule delivery.</p>
      </section>
    </div>
  );
}
