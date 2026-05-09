export default function About() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">About Onestop Veggies</h1>
        <p className="mt-4 text-slate-600 leading-7">
          Onestop Veggies is a modern agricultural enterprise dedicated to growing and supplying the highest quality fresh vegetables. From our well-managed farm to your business, we ensure every produce meets the highest standards of freshness and taste.
        </p>
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        {[
          { title: "Our Story", description: "We began with a simple goal: deliver premium farm produce directly to restaurants, markets and families with complete transparency." },
          { title: "Our Mission", description: "Provide reliable, traceable fresh produce with consistent quality and responsive customer support." },
          { title: "Our Vision", description: "Build a trusted supply chain that connects growers, buyers, and communities through fresh, healthy food." },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-slate-600">{item.description}</p>
          </div>
        ))}
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Our Farm & Practices</h2>
          <p className="mt-4 text-slate-600 leading-7">
            Our farm uses modern crop management practices, careful irrigation, and responsible handling to grow vegetables with minimal chemicals and maximum freshness.
          </p>
          <ul className="mt-6 space-y-3 text-slate-600">
            <li>• Sustainable crop rotations and careful soil management</li>
            <li>• Harvest planning for consistent bulk supply</li>
            <li>• Dedicated packing and cold-chain handling</li>
          </ul>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Commitment to Quality</h2>
          <p className="mt-4 text-slate-600 leading-7">
            Every batch is inspected before packing. We maintain strict quality standards, clear traceability, and fast delivery so your customers receive produce at its best.
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-emerald-50 p-5">
              <h3 className="font-semibold text-slate-900">Worker Welfare</h3>
              <p className="mt-2 text-slate-600">Our farm supports an experienced team that harvests and packs with care.</p>
            </div>
            <div className="rounded-3xl bg-emerald-50 p-5">
              <h3 className="font-semibold text-slate-900">Traceability</h3>
              <p className="mt-2 text-slate-600">We track production from field to delivery, so you always know where your produce comes from.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
