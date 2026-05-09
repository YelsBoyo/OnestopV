import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, phone, message } = req.body;
    const { data, error } = await supabase
      .from("messages")
      .insert([{ name, email, phone, message, type: "contact" }]);

    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ success: true, data });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
