import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUser, signOut } from "../lib/supabaseClient";

export default function Admin() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getUser();
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    };
    checkUser();
  }, [router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleNavigate = (path) => () => router.push(path);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
            <p className="mt-4 text-slate-600">Add vegetables, update stock, post announcements, and view customer interactions.</p>
          </div>
          <button onClick={handleSignOut} className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
            Sign Out
          </button>
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-2">
        {[
          { title: "Add vegetables", description: "Create new products and keep your catalog up to date." },
          { title: "Update stock", description: "Adjust quantities and harvest status quickly." },
          { title: "Post announcements", description: "Share promotions, delivery updates, and harvest alerts." },
          { title: "View messages", description: "Review customer inquiries and order requests." },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Quick actions</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <button onClick={handleNavigate("/add-output")} className="rounded-3xl bg-brand-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-brand-700">Add output</button>
          <button onClick={handleNavigate("/orders")} className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50">View orders</button>
          <button onClick={handleNavigate("/gallery")} className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50">Upload images</button>
          <button onClick={handleNavigate("/farm-output")} className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50">See reports</button>
        </div>
      </section>
    </div>
  );
}
