# 🚀 Quick Start Action Plan for Onestop Veggies

## What You Need to Do RIGHT NOW

### ✅ **STEP 1: Get Your Supabase Service Role Key (5 mins)**
1. Go to **https://app.supabase.com**
2. Log in and select your project
3. Click **Settings** (gear icon) in the sidebar
4. Click **API** tab
5. Copy the **Service Role Secret** key
6. Update `.env.local`:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_copied_key_here
   ```
   Restart your dev server: `npm run dev`

---

### ✅ **STEP 2: Create Database Tables in Supabase (10 mins)**

1. Go to **https://app.supabase.com** → Your Project
2. Click **SQL Editor** on the left
3. Click **New Query**
4. **Copy and paste the SQL from** [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Sections 1.1 and 1.2
5. Click **Run** for each SQL block
6. You should see "Success" and the tables appear in **Table Editor**

**Expected tables after this step:**
- ✅ `products`
- ✅ `farm_output`
- ✅ `orders`
- ✅ `contact_messages`

---

### ✅ **STEP 3: Add Sample Data (10 mins)**

1. Go to **Table Editor** → **products**
2. Click **+ Insert row**
3. Add test data:

| Field | Value | Field | Value |
|-------|-------|-------|-------|
| name | Tomatoes | category | Vegetables |
| description | Fresh, ripe tomatoes | price | 250 |
| quantity_available | 50 | in_stock | true |

4. Add 3-4 more products (Kale, Carrots, Spinach)

---

### ✅ **STEP 4: Test Your API Endpoints (15 mins)**

#### **Test Contact Endpoint**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "254104830294",
    "message": "I want to order vegetables",
    "subject": "Order Inquiry"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "Thank you! We'll get back to you soon."
}
```

#### **Test Orders Endpoint**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Jane Smith",
    "customerEmail": "jane@example.com",
    "customerPhone": "254704123456",
    "items": [{"name": "Tomatoes", "quantity": 2, "price": 250}],
    "totalPrice": 500,
    "deliveryAddress": "123 Main St, Nairobi"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "Order created successfully!",
  "order": { ... }
}
```

#### **Test Farm Output Endpoint**
```bash
curl -X GET http://localhost:3000/api/outputs
```

**Expected response:**
```json
{
  "success": true,
  "outputs": [...]
}
```

---

### ✅ **STEP 5: Verify in Supabase Dashboard**

1. After running the tests, go to **Table Editor**
2. Open each table:
   - **contact_messages** → should show your test message
   - **orders** → should show your test order
   - **farm_output** → should show any harvest data

---

### ✅ **STEP 6: Fix Any Components Using Old API**

Search your components for references to old API fields and update them. For example:

**OLD (❌):**
```javascript
const { customerName, phone, location, items } = req.body;
```

**NEW (✅):**
```javascript
const { customerName, customerEmail, customerPhone, deliveryAddress, items, totalPrice } = req.body;
```

Components to check:
- `components/ContactSection.js` - update form fields for contact endpoint
- `components/ProductShowcase.js` - add product fetching from database
- `pages/products.js` - display products from Supabase
- `pages/farm-output.js` - display farm output from Supabase

---

### ✅ **STEP 7: GitHub Pages Setup**

Your HTML file is ready at `public/index.html`

For full deployment:
1. **Option A: Deploy to Vercel (Easiest)**
   - Push to GitHub
   - Go to **https://vercel.com**
   - Click "New Project"
   - Import your GitHub repo
   - Click "Deploy"
   - Your app is live!

2. **Option B: GitHub Pages**
   - Add this to `next.config.js`:
     ```javascript
     module.exports = {
       output: 'export',
       basePath: '/Onestop_Veggies',
       distDir: 'out'
     }
     ```
   - Run: `npm run build`
   - Push `out/` folder to GitHub Pages branch

---

## 🆘 **Troubleshooting**

### Problem: "Table doesn't exist"
**Solution:** Verify you ran the SQL CREATE TABLE commands in step 2

### Problem: "403 Forbidden" or "CORS error"
**Solution:** Check your `.env.local` has the correct Supabase URL and ANON KEY

### Problem: "Service role key is not configured"
**Solution:** Get your Service Role Key from Supabase Settings → API and add to `.env.local`

### Problem: "Foreign key constraint violation"
**Solution:** Make sure you create products first before adding farm_output records

### Problem: WhatsApp notifications not working
**Solution:** This is optional - the order will still be created successfully. Just comment out the WhatsApp section if not needed.

---

## 📝 Checklist

- [ ] Got Service Role Key from Supabase
- [ ] Updated `.env.local` with Service Role Key
- [ ] Created all 4 database tables
- [ ] Verified tables in Table Editor
- [ ] Added sample products
- [ ] Tested contact API endpoint
- [ ] Tested orders API endpoint
- [ ] Tested farm output API endpoint
- [ ] Verified data in Supabase dashboard
- [ ] Updated components with new field names
- [ ] Deployed to Vercel or configured GitHub Pages

---

## 📚 Reference Files

- **Setup Guide:** [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
- **Updated API Routes:**
  - [pages/api/contact.js](pages/api/contact.js)
  - [pages/api/orders.js](pages/api/orders.js)
  - [pages/api/outputs.js](pages/api/outputs.js)
- **HTML Entry Point:** [public/index.html](public/index.html)
- **Environment File:** [.env.local](.env.local)

---

**Questions?** Check the SUPABASE_SETUP.md file for detailed explanations!
