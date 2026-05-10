import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const PRODUCT_CATEGORIES = ["All", "Fruits", "Vegetables"];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, price, image_url, category, in_stock, quantity_available")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
        setProducts([]);
      } else {
        setProducts(data || []);
        setError(null);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Our Fresh Produce</h1>
        <p className="mt-4 text-slate-600">Browse our current harvest and request a quote for bulk supply, restaurant orders, or wholesale delivery.</p>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-wrap gap-3">
          {PRODUCT_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-brand-600 text-white"
                  : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-600 hover:text-brand-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
        {loading ? (
          <p className="text-slate-600">Loading products…</p>
        ) : error ? (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-slate-900">
            <h2 className="text-xl font-semibold text-amber-900">Products unavailable</h2>
            <p className="mt-3 text-sm text-amber-800">Please contact your administrator for help.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-slate-600">No products found for this category.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">{product.name}</h2>
                <p className="mt-3 text-slate-600">{product.description}</p>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p><span className="font-semibold text-slate-900">Category:</span> {product.category || "—"}</p>
                  <p><span className="font-semibold text-slate-900">Price:</span> KES {product.price ?? "—"}</p>
                  <p><span className="font-semibold text-slate-900">Available:</span> {product.quantity_available ?? "—"} kg</p>
                  <p><span className="font-semibold text-slate-900">Status:</span> {product.in_stock ? "In stock" : "Out of stock"}</p>
                </div>
                <a
                  href="/contact"
                  className="mt-6 inline-flex rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Request Quote
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
