export default function Products() {
  const products = [
    { name: "Tomatoes", price: "₹45/kg", availability: "Ready" },
    { name: "Spinach", price: "₹30/kg", availability: "Growing" },
    { name: "Cabbage", price: "₹28/kg", availability: "Harvesting" },
    { name: "Carrots", price: "₹50/kg", availability: "Ready" },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Products</h1>
        <p className="mt-4 text-slate-600">Browse the current vegetable catalog and place orders through WhatsApp.</p>
      </section>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{product.name}</h2>
            <p className="mt-2 text-slate-600">Price: {product.price}</p>
            <p className="mt-1 text-slate-600">Status: {product.availability}</p>
            <a
              href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://wa.me/1234567890"}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Order on WhatsApp
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
