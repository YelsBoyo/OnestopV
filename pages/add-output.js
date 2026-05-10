import { useEffect, useState } from "react";

export default function AddOutput() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [quantityKg, setQuantityKg] = useState("");
  const [qualityNotes, setQualityNotes] = useState("");
  const [status, setStatus] = useState("harvested");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/products");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Unable to load product list.");
        }

        setProducts(result.products || []);
        setError(null);
      } catch (fetchError) {
        console.error("Error fetching products for output form:", fetchError);
        setError(fetchError.message || "Unable to load product list.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    const response = await fetch("/api/outputs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        harvest_date: harvestDate,
        quantity_kg: quantityKg,
        quality_notes: qualityNotes,
        status,
      }),
    });

    const result = await response.json();
    setSubmitting(false);

    if (!response.ok) {
      setError(result.error || "Failed to add output.");
      return;
    }

    setMessage("New farm output saved successfully.");
    setProductId("");
    setHarvestDate("");
    setQuantityKg("");
    setQualityNotes("");
    setStatus("harvested");
  };

  return (
    <div className="space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Add Farm Output</h1>
        <p className="mt-4 text-slate-600">Record a new harvest entry so your output dashboard stays current.</p>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
        {loading ? (
          <p className="text-slate-600">Loading products…</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
            {message && <p className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">{message}</p>}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Product</span>
                <select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                  required
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Harvest date</span>
                <input
                  type="date"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                  required
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Quantity (kg)</span>
                <input
                  type="number"
                  step="0.01"
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Status</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                >
                  <option value="harvested">Harvested</option>
                  <option value="packed">Packed</option>
                  <option value="shipped">Shipped</option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Quality notes</span>
              <textarea
                value={qualityNotes}
                onChange={(e) => setQualityNotes(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                rows={4}
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Save output"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
