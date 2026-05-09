export default function Gallery() {
  const photos = [
    "Fields at sunrise",
    "Harvesting fresh produce",
    "Packing premium vegetables",
    "Farm team in action",
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Gallery</h1>
        <p className="mt-4 text-slate-600">A visual look at our farm, harvest process, and fresh produce quality.</p>
      </section>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {photos.map((photo) => (
          <div key={photo} className="group relative overflow-hidden rounded-3xl bg-slate-100 p-8 text-center text-slate-900 shadow-sm">
            <div className="h-40 rounded-3xl bg-gradient-to-br from-emerald-300 via-emerald-400 to-slate-400" />
            <p className="mt-4 text-lg font-semibold">{photo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
