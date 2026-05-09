export default function ProductShowcase() {
  const products = [
    { name: "Tomatoes", description: "Juicy vine-ripened tomatoes", status: "Ready" },
    { name: "Spinach", description: "Leafy organic spinach", status: "Growing" },
    { name: "Cabbage", description: "Crisp farm-grown cabbage", status: "Harvesting" },
    { name: "Carrots", description: "Sweet root vegetables", status: "Ready" },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Fresh vegetables showcase</h2>
          <p className="mt-2 text-slate-600">Highlight what is available today and show customers your supply pipeline.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
            <p className="mt-3 text-slate-600">{product.description}</p>
            <span className="mt-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
              {product.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
