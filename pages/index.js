import supabase from "../supabaseClient";
import HeroSection from "../components/HeroSection";
import ProductShowcase from "../components/ProductShowcase";
import FarmOutputTable from "../components/FarmOutputTable";

export default function Home() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <section className="rounded-3xl bg-brand-600 p-8 text-white shadow-xl shadow-brand-500/20">
        <h2 className="text-2xl font-semibold">Promotions</h2>
        <p className="mt-4 text-slate-100 leading-7">Get 10% off your first order! Follow us on social media for daily updates and exclusive deals.</p>
        <div className="mt-6 flex gap-4">
          <a href="https://instagram.com/yourfarm" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700">Instagram</a>
          <a href="https://facebook.com/yourfarm" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700">Facebook</a>
          <a href="https://tiktok.com/@yourfarm" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700">TikTok</a>
        </div>
      </section>
      <section className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/70">
        <h2 className="text-2xl font-semibold text-slate-900">Farm story</h2>
        <p className="mt-4 text-slate-600 leading-7">
          We pair sustainable farming with customer communication tech to deliver fresh vegetables directly to your table. Build audience trust with harvest updates, promotions, and fast order support.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-emerald-50 p-5">
            <h3 className="font-semibold text-slate-900">Trusted locally</h3>
            <p className="mt-2 text-slate-600">Daily deliveries to nearby neighborhoods.</p>
          </div>
          <div className="rounded-3xl bg-emerald-50 p-5">
            <h3 className="font-semibold text-slate-900">Organic focus</h3>
            <p className="mt-2 text-slate-600">Naturally grown greens and vegetables.</p>
          </div>
        </div>
      </section>
      <ProductShowcase />
      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Testimonials</h2>
          <div className="mt-6 space-y-6">
            {[
              { name: "Maria", quote: "The freshest produce and a fast WhatsApp order process." },
              { name: "Ravi", quote: "The farm dashboard helps me keep product availability accurate." },
            ].map((item) => (
              <div key={item.name} className="rounded-3xl bg-slate-50 p-5">
                <p className="text-slate-700">“{item.quote}”</p>
                <p className="mt-3 text-sm font-semibold text-slate-900">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-brand-600 p-8 text-white shadow-xl shadow-brand-500/20">
          <h2 className="text-2xl font-semibold">Join the farm community</h2>
          <p className="mt-4 text-slate-100 leading-7">Get harvest updates, promotions, and delivery alerts by connecting with us today.</p>
          <a
            href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://wa.me/1234567890"}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-md shadow-brand-900/10"
          >
            Message on WhatsApp
          </a>
        </div>
      </section>
      <FarmOutputTable />
      <section id="contact" className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Ready to order?</h2>
        <p className="mt-3 text-slate-600">Use the contact page to send requests, questions, or delivery instructions.</p>
      </section>
    </div>
  );
}
