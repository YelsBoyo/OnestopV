import { supabaseAdmin } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  try {
    if (!supabaseAdmin) {
      return res.status(500).json({ 
        error: "Server not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env.local" 
      });
    }

    if (req.method === "GET") {
      const { data, error } = await supabaseAdmin
        .from("farm_output")
        .select("*")
        .order("harvest_date", { ascending: false });

      if (error) {
        console.error("Query error:", error);
        return res.status(500).json({ error: error.message });
      }

      res.status(200).json({ success: true, outputs: data || [] });
    } 
    else if (req.method === "POST") {
      const { product_id, harvest_date, quantity_kg, quality_notes, status } = req.body;

      if (!product_id || !harvest_date || !quantity_kg) {
        return res.status(400).json({ 
          error: "Missing required fields: product_id, harvest_date, quantity_kg" 
        });
      }

      const { data, error } = await supabaseAdmin
        .from("farm_output")
        .insert([{
          product_id,
          harvest_date,
          quantity_kg,
          quality_notes: quality_notes || null,
          status: status || "harvested"
        }])
        .select();

      if (error) {
        console.error("Insert error:", error);
        return res.status(500).json({ error: error.message });
      }

      res.status(201).json({ success: true, output: data?.[0] });
    }
    else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
