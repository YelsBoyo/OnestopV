export default async function handler(req, res) {
  if (req.method === "POST") {
    const { phone, message } = req.body;
    // TODO: Integrate with WhatsApp Business API or Twilio
    // For now, simulate success
    console.log(`Sending WhatsApp to ${phone}: ${message}`);
    res.status(200).json({ success: true, message: "WhatsApp sent (simulated)" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
