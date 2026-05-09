import { supabaseAdmin } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  const supabase = supabaseAdmin;
  if (!supabase) {
    return res.status(500).json({ error: "Supabase service role key is not configured on the server." });
  }

  if (req.method === "GET") {
    const { data, error } = await supabase.from("outputs").select("*");
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ outputs: data });
    }
  } else if (req.method === "POST") {
    const { vegetable, quantity, status, harvest_date } = req.body;
    const { data, error } = await supabase
      .from("outputs")
      .insert([{ vegetable, quantity, status, harvest_date }]);

    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ success: true, output: data[0] });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
