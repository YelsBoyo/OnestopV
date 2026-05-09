export default function ProductShowcase() {
  const products = [
    { name: "Onion", description: "Red and white varieties with crunchy layers and rich flavor." },
    { name: "Watermelon", description: "Sweet, juicy watermelons harvested at peak ripeness." },
    { name: "Sweet Melon", description: "Premium sweet melons with fragrant aroma and silky texture." },
    { name: "Red Capsicum", description: "Bright red capsicum perfect for salads and cooking." },
    { name: "Green Capsicum", description: "Garden-fresh green capsicum with crisp bite." },
    { name: "Yellow Capsicum", description: "Sunny yellow capsicum with mild sweetness." },
    { name: "Tandora", description: "Fresh, nutritious tandora harvested daily from our fields." },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Our Signature Products</h2>
          <p className="mt-2 text-slate-600">Premium fresh produce handpicked from our farm for restaurants, markets, and bulk buyers.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
            <p className="mt-3 text-slate-600">{product.description}</p>
            <a
              href="/products"
              className="mt-6 inline-flex rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
