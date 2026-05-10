import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, name, category, in_stock, quantity_available")
    .order("name", { ascending: true });

  if (error) {
    console.error("API products error:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ products: data || [] });
}
