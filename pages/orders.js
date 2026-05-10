import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("id, customer_name, customer_email, customer_phone, order_items, total_price, status, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
        setOrders([]);
      } else {
        setOrders(data || []);
        setError(null);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className="space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Customer Orders</h1>
        <p className="mt-4 text-slate-600">Review the latest order requests and contact your customer directly.</p>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
        {loading ? (
          <p className="text-slate-600">Loading orders…</p>
        ) : error ? (
          <p className="text-red-600">Unable to load orders. Please contact the administrator.</p>
        ) : orders.length === 0 ? (
          <p className="text-slate-600">No orders have been received yet.</p>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Order details</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 text-slate-900">
                      <p className="font-semibold">{order.customer_name}</p>
                      <p className="text-slate-500">{order.customer_email}</p>
                      <p className="text-slate-500">{order.customer_phone}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      <pre className="whitespace-pre-wrap text-sm text-slate-600">{JSON.stringify(order.order_items, null, 2)}</pre>
                    </td>
                    <td className="px-6 py-4 text-slate-700">KES {order.total_price}</td>
                    <td className="px-6 py-4 text-slate-700">{order.status}</td>
                    <td className="px-6 py-4 text-slate-700">{new Date(order.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
