<<<<<<< HEAD
# OnestopVeggies
=======
# Agriculture CRM + Marketing System

A starter Next.js + Tailwind project for an agriculture business CRM and marketing website.

## Features
- Landing page with hero, products, story, testimonials, CTA, WhatsApp call to action
- Farm output dashboard page with CRUD operations
- Contact form with API route stub
- Admin page with authentication and management sections
- Supabase integration for database and auth
- WhatsApp automation flow (simulated)
- Social media links and promotions sections

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_WHATSAPP_LINK=https://wa.me/0104830294?text=Hello%20Farm
   ```
   > Keep `SUPABASE_SERVICE_ROLE_KEY` secret and do not commit it to source control.
3. Set up Supabase database with tables:
   ```sql
   CREATE TABLE customers (id SERIAL PRIMARY KEY, name TEXT, phone TEXT, location TEXT, favorites TEXT[]);
   CREATE TABLE outputs (id SERIAL PRIMARY KEY, vegetable TEXT, quantity TEXT, status TEXT, harvest_date TEXT);
   CREATE TABLE orders (id SERIAL PRIMARY KEY, customer_name TEXT, phone TEXT, location TEXT, items TEXT, status TEXT);
   CREATE TABLE messages (id SERIAL PRIMARY KEY, name TEXT, email TEXT, phone TEXT, message TEXT, type TEXT);
   ```
4. Run locally:
   ```bash
   npm run dev
   ```

## Authentication
- Admin login at `/login`
- Protected admin dashboard at `/admin`

## WhatsApp Integration
- Simulated in `/api/whatsapp.js`
- Replace with real WhatsApp Business API or Twilio

## Next steps
- Connect real WhatsApp API
- Add image uploads for gallery
- Implement full CRUD in admin
- Add email notifications
>>>>>>> 8184fb6 (first commit)
