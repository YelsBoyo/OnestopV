export default function About() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">About Us</h1>
        <p className="mt-4 text-slate-600 leading-7">
          FarmFlow CRM is built for modern agriculture businesses that want to grow sales, build customer loyalty, and track production in one simple system.
        </p>
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        {[
          { title: "Our Mission", description: "Bring farm-fresh produce to customers with dependable communication." },
          { title: "Our Values", description: "Sustainability, transparency, and timely delivery." },
          { title: "Our Vision", description: "Make farm marketing and operations easier for growers." },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-slate-600">{item.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
