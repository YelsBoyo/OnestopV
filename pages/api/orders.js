import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { customerName, customerEmail, customerPhone, deliveryAddress, items, totalPrice } = req.body;
      
      if (!customerName || !customerEmail || !customerPhone || !items || !totalPrice) {
        return res.status(400).json({ 
          error: "Missing required fields: customerName, customerEmail, customerPhone, items, totalPrice" 
        });
      }

      const { data, error } = await supabase
        .from("orders")
        .insert([{
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          delivery_address: deliveryAddress || "Not specified",
          order_items: items,
          total_price: totalPrice,
          status: "pending"
        }])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error: error.message });
      }

      // Trigger WhatsApp notification (optional)
      try {
        const whatsappMessage = `Hi ${customerName}, your order is confirmed! Total: KES ${totalPrice}. We'll deliver soon. Check your email for details.`;
        await fetch("/api/whatsapp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: customerPhone, message: whatsappMessage }),
        }).catch(err => console.log("WhatsApp notification failed:", err));
      } catch (whatsappErr) {
        console.log("WhatsApp error (non-blocking):", whatsappErr);
      }

      res.status(201).json({ 
        success: true, 
        message: "Order created successfully!",
        order: data?.[0] 
      });
    } catch (err) {
      console.error("Handler error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      res.status(200).json({ success: true, orders: data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
