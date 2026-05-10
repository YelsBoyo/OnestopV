import { useState } from "react";

const BUSINESS_TYPES = ["Restaurant", "Market / Supermarket", "Hotel", "Wholesaler", "Individual"];
const PRODUCT_OPTIONS = ["Onion", "Watermelon", "Sweet Melon", "Red Capsicum", "Green Capsicum", "Yellow Capsicum", "Tandora"];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    businessType: "Restaurant",
    phone: "",
    email: "",
    productInterest: [],
    quantity: "",
    location: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleProductInterestChange = (event) => {
    const { value, checked } = event.target;
    setForm((current) => {
      const interests = checked
        ? [...current.productInterest, value]
        : current.productInterest.filter((item) => item !== value);
      return { ...current, productInterest: interests };
    });
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
      setForm({
        name: "",
        businessType: "Restaurant",
        phone: "",
        email: "",
        productInterest: [],
        quantity: "",
        location: "",
        message: "",
      });
    } else {
      setStatus("Failed to send message.");
    }
  };

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm" id="contact">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_0.6fr]">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Contact Us</h1>
          <p className="mt-4 text-slate-600 leading-7">
            Send your inquiry for bulk supply, product availability, or delivery options. Use the form below or reach us directly on WhatsApp for quick responses.
          </p>
          <div className="mt-8 space-y-4 text-slate-600">
            <p>
              Phone: <a href="tel:+254104830294" className="text-brand-700 hover:text-brand-900">+254 104830294</a>
            </p>
            <p>
              WhatsApp: <a href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://wa.me/254104830294"} className="text-brand-700 hover:text-brand-900" target="_blank" rel="noreferrer">Chat now</a>
            </p>
            <p>Email: <a href="mailto:info@onestopveggies.com" className="text-brand-700 hover:text-brand-900">info@onestopveggies.com</a></p>
            <p>Address: Green Valley Farm, City outskirts – fresh produce ready for pickup and delivery.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-slate-50 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Full Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Business Type</span>
              <select
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
              >
                {BUSINESS_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Phone Number</span>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                required
              />
            </label>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-700">Product Interest</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PRODUCT_OPTIONS.map((product) => (
                <label key={product} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <input
                    type="checkbox"
                    value={product}
                    checked={form.productInterest.includes(product)}
                    onChange={handleProductInterestChange}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm text-slate-700">{product}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Quantity Required</span>
              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                placeholder="Approx. kg or crates"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Delivery Location</span>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                placeholder="City, market, hotel"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
              placeholder="Tell us about your order or ask any questions"
            />
          </label>
          <button type="submit" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
            Send inquiry
          </button>
          {status && <p className="mt-2 text-sm text-emerald-700">{status}</p>}
        </form>
      </div>
    </section>
  );
}
