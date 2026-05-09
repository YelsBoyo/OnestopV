import ContactSection from "../components/ContactSection";

export default function Contact() {
  return (
    <div className="space-y-10">
      <ContactSection />
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Customer database</h2>
        <p className="mt-4 text-slate-600">Store customer names, phone numbers, locations, orders, and favorite vegetables in your Supabase backend.</p>
      </section>
    </div>
  );
}
