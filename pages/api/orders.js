import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { customerName, phone, location, items } = req.body;
    const { data, error } = await supabase
      .from("orders")
      .insert([{ customer_name: customerName, phone, location, items, status: "pending" }]);

    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      // Trigger WhatsApp automation
      const whatsappMessage = `Hi ${customerName}, your order for ${items} is confirmed. We'll deliver to ${location}.`;
      await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, message: whatsappMessage }),
      });
      res.status(200).json({ success: true, order: data[0] });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
