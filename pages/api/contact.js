import { supabaseAdmin } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      if (!supabaseAdmin) {
        return res.status(500).json({ 
          error: "Server not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env.local" 
        });
      }

      const { name, email, phone, message, subject } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      const { data, error } = await supabaseAdmin
        .from("contact_messages")
        .insert([{
          name,
          email,
          phone: phone || null,
          message,
          subject: subject || null,
          read: false
        }]);

      if (error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error: error.message });
      }

      res.status(201).json({ success: true, message: "Thank you! We'll get back to you soon.", data });
    } catch (err) {
      console.error("Handler error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "GET") {
    res.status(200).json({ message: "Contact API endpoint. Use POST to submit messages." });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
