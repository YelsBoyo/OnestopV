import { supabase, supabaseAdmin } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const client = supabaseAdmin || supabase;
  const { data, error } = await client
    .from("gallery")
    .select("id, image_url, title, description, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("API gallery-images error:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ images: data || [] });
}
