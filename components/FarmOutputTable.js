import { useEffect, useState } from "react";

const FarmOutputTable = () => {
  const [outputs, setOutputs] = useState([]);

  useEffect(() => {
    const fetchOutputs = async () => {
      const response = await fetch("/api/outputs");
      const data = await response.json();
      setOutputs(data.outputs || []);
    };
    fetchOutputs();
  }, []);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Farm Output Dashboard</h2>
            <p className="mt-2 text-slate-600">Track harvest status and production totals in one place.</p>
          </div>
          <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
            Total production: {outputs.reduce((sum, o) => sum + parseInt(o.quantity || 0), 0)}kg
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-left">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-6 py-4">Vegetable</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Harvest Date</th>
            </tr>
          </thead>
          <tbody>
            {outputs.map((row) => (
              <tr key={row.id} className="border-t border-slate-200 last:border-b">
                <td className="px-6 py-4 text-slate-800">{row.vegetable}</td>
                <td className="px-6 py-4 text-slate-700">{row.quantity}</td>
                <td className="px-6 py-4 text-slate-700">{row.status}</td>
                <td className="px-6 py-4 text-slate-700">{row.harvest_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default FarmOutputTable;
