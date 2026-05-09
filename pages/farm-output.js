import FarmOutputTable from "../components/FarmOutputTable";

export default function FarmOutput() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Farm Output</h1>
        <p className="mt-4 text-slate-600">Monitor harvest progress, quantities, and daily production summaries.</p>
      </section>
      <FarmOutputTable />
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Reports</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Daily Harvest", text: "Track today’s fresh yield and ready stock." },
            { title: "Weekly Summary", text: "Review production totals and planning." },
            { title: "Quality Notes", text: "Record field quality and packing updates." },
          ].map((card) => (
            <div key={card.title} className="rounded-3xl bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-3 text-slate-600">{card.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
