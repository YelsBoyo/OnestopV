import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    if (result.success) {
      setStatus("Message sent successfully.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      setStatus("Failed to send message.");
    }
  };

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_0.6fr]">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Contact</h1>
          <p className="mt-4 text-slate-600 leading-7">
            Send orders, questions, or delivery requests directly from the website. We also support WhatsApp for real-time ordering.
          </p>
          <div className="mt-8 space-y-4 text-slate-600">
            <p>Order on WhatsApp: <a href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://wa.me/1234567890"} className="text-brand-700 hover:text-brand-900" target="_blank" rel="noreferrer">Click to chat</a></p>
            <p>Social media: Instagram · Facebook · TikTok</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-slate-50 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Phone</span>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                required
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
              type="email"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
              required
            />
          </label>
          <button type="submit" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
            Send message
          </button>
          {status && <p className="mt-2 text-sm text-emerald-700">{status}</p>}
        </form>
      </div>
    </section>
  );
}
