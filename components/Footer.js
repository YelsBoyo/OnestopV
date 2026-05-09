export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-slate-500">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Onestop Veggies. Premium fresh produce supplier.</p>
          <div className="flex gap-4">
            <a href="https://instagram.com/yourfarm" className="hover:text-brand-600">Instagram</a>
            <a href="https://facebook.com/yourfarm" className="hover:text-brand-600">Facebook</a>
            <a href="https://tiktok.com/@yourfarm" className="hover:text-brand-600">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
