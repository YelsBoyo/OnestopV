import { useState } from "react";

const PRODUCT_CATEGORIES = ["All", "Fruits", "Vegetables"];
const products = [
  {
    name: "Onion",
    category: "Vegetables",
    description: "Red and white onion varieties for kitchens and foodservice.",
    season: "Year-round",
    packaging: "Crates, boxes, bulk sacks",
  },
  {
    name: "Watermelon",
    category: "Fruits",
    description: "Sweet, juicy watermelons harvested at peak ripeness.",
    season: "Seasonal",
    packaging: "Bulk pallets, crate-packed",
  },
  {
    name: "Sweet Melon",
    category: "Fruits",
    description: "Premium sweet melons with fragrant aroma and smooth texture.",
    season: "Seasonal",
    packaging: "Boxed, bulk",
  },
  {
    name: "Red Capsicum",
    category: "Vegetables",
    description: "Bright red capsicum perfect for salads and cooking.",
    season: "Year-round",
    packaging: "Crates, cartons",
  },
  {
    name: "Green Capsicum",
    category: "Vegetables",
    description: "Garden-fresh green capsicum with crisp bite.",
    season: "Year-round",
    packaging: "Crates, cartons",
  },
  {
    name: "Yellow Capsicum",
    category: "Vegetables",
    description: "Sunny yellow capsicum with mild sweetness.",
    season: "Year-round",
    packaging: "Crates, cartons",
  },
  {
    name: "Tandora",
    category: "Vegetables",
    description: "Fresh tandora harvested daily and packed for wholesale buyers.",
    season: "Year-round",
    packaging: "Bulk crates, boxes",
  },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
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
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <div key={product.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{product.name}</h2>
            <p className="mt-3 text-slate-600">{product.description}</p>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p><span className="font-semibold text-slate-900">Seasonality:</span> {product.season}</p>
              <p><span className="font-semibold text-slate-900">Packaging:</span> {product.packaging}</p>
              <p><span className="font-semibold text-slate-900">Quality:</span> Traceable, farm-fresh produce.</p>
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
    </div>
  );
}
