import ContactSection from "../components/ContactSection";

export default function Contact() {
  return (
    <div className="space-y-10">
      <ContactSection />
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Contact details</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-3xl bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Phone</h3>
            <p className="mt-3 text-slate-600">+1 234 567 890</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Email</h3>
            <p className="mt-3 text-slate-600">info@onestopveggies.com</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Address</h3>
            <p className="mt-3 text-slate-600">Green Valley Farm, outskirts of the city. Bulk pickup available, delivery to hotels and markets.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
