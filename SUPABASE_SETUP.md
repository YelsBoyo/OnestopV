# Supabase Setup Guide for Onestop Veggies

## Your Supabase Credentials (Already Set in .env.local)
- **URL**: https://tvpuuirjinahfkllhkvn.supabase.co
- **Anon Key**: sb_publishable_ak8KiIyAxSb2PffqQVBbvQ_cB-8nXKq
- **REST API**: https://tvpuuirjinahfkllhkvn.supabase.co/rest/v1/

---

## STEP 1: Create Database Tables in Supabase Dashboard

### 1.1 Log in to Supabase Dashboard
1. Go to https://app.supabase.com
2. Click on your project "onestop_veggies" (or whatever it's named)
3. Click **SQL Editor** on the left sidebar
4. Click **New Query**

### 1.2 Create the Tables

#### **Table 1: Products**
```sql
CREATE TABLE IF NOT EXISTS products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category VARCHAR(100),
  in_stock BOOLEAN DEFAULT true,
  quantity_available INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON products
  FOR SELECT USING (true);
```

#### **Table 2: Farm Output (Harvest/Produce Tracking)**
```sql
CREATE TABLE IF NOT EXISTS farm_output (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  harvest_date DATE NOT NULL,
  quantity_kg DECIMAL(10, 2) NOT NULL,
  quality_notes TEXT,
  status VARCHAR(50) DEFAULT 'harvested',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE farm_output ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON farm_output
  FOR SELECT USING (true);
```

#### **Table 3: Orders**
```sql
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  order_items JSONB NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  delivery_address TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read own orders" ON orders
  FOR SELECT USING (true);
```

#### **Table 4: Contact Messages**
```sql
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  subject VARCHAR(255),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');
```

**Steps to Execute:**
1. Paste each SQL block into the SQL Editor
2. Click **Run** (or Ctrl+Enter)
3. You should see "Success" message

---

## STEP 2: Verify Tables in Table Editor

1. Go to **SQL Editor** → Click on any table name in left sidebar
2. Or click **Table Editor** to see all your tables
3. You should see: `products`, `farm_output`, `orders`, `contact_messages`

---

## STEP 3: Query Your Database with Supabase Client

### Using Supabase JS Client (Already set up in `lib/supabaseClient.js`)

#### **Example: Fetch all products**
```javascript
import { supabase } from '@/lib/supabaseClient';

const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) console.error('Error fetching products:', error);
  return data;
};
```

#### **Example: Insert a new order**
```javascript
const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        customer_name: orderData.name,
        customer_email: orderData.email,
        customer_phone: orderData.phone,
        order_items: orderData.items, // Should be JSON
        total_price: orderData.total,
        delivery_address: orderData.address
      }
    ]);
  
  if (error) console.error('Error creating order:', error);
  return data;
};
```

#### **Example: Fetch farm output**
```javascript
const getFarmOutput = async () => {
  const { data, error } = await supabase
    .from('farm_output')
    .select(`
      id,
      harvest_date,
      quantity_kg,
      status,
      products (id, name, category)
    `)
    .order('harvest_date', { ascending: false });
  
  if (error) console.error('Error fetching farm output:', error);
  return data;
};
```

---

## STEP 4: Using the REST API Directly (Optional)

### **Fetch Products with curl or fetch**
```bash
curl -X GET "https://tvpuuirjinahfkllhkvn.supabase.co/rest/v1/products?select=*" \
  -H "apikey: sb_publishable_ak8KiIyAxSb2PffqQVBbvQ_cB-8nXKq"
```

### **In JavaScript/Fetch**
```javascript
const getProductsViaREST = async () => {
  const response = await fetch(
    'https://tvpuuirjinahfkllhkvn.supabase.co/rest/v1/products?select=*',
    {
      headers: {
        'apikey': 'sb_publishable_ak8KiIyAxSb2PffqQVBbvQ_cB-8nXKq',
        'Content-Type': 'application/json'
      }
    }
  );
  const data = await response.json();
  return data;
};
```

---

## STEP 5: Add Sample Data

In **Table Editor**, add test data:

1. Click **products** table
2. Click **+ Insert row**
3. Add:
   - name: "Tomatoes"
   - description: "Fresh, ripe tomatoes"
   - price: 250
   - category: "Vegetables"
   - in_stock: true
   - quantity_available: 50

Repeat for other products (Kale, Carrots, Spinach, etc.)

---

## STEP 6: Fix Your API Endpoints (pages/api/)

### Update `pages/api/orders.js`
```javascript
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { customerName, customerEmail, customerPhone, items, total, address } = req.body;
      
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            order_items: items,
            total_price: total,
            delivery_address: address,
            status: 'pending'
          }
        ]);
      
      if (error) throw error;
      res.status(201).json({ success: true, order: data });
    } catch (error) {
      console.error('Order error:', error);
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

### Update `pages/api/contact.js`
```javascript
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, message, subject } = req.body;
      
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name,
            email,
            phone,
            message,
            subject
          }
        ]);
      
      if (error) throw error;
      res.status(201).json({ success: true, message: 'Message sent!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

---

## STEP 7: Test Your Setup

### Test 1: In your component
```javascript
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TestComponent() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('products').select('*');
      setProducts(data || []);
    };
    fetchData();
  }, []);
  
  return <div>{products.map(p => <p key={p.id}>{p.name}</p>)}</div>;
}
```

### Test 2: Check Supabase Dashboard
1. Go to **Table Editor**
2. Insert test data
3. Check **Logs** for any errors

---

## STEP 8: Troubleshooting

### Issue: "CORS error" or "401 Unauthorized"
- ✅ Verify your NEXT_PUBLIC_SUPABASE_ANON_KEY is correct in .env.local
- ✅ Verify URL is correct: https://tvpuuirjinahfkllhkvn.supabase.co

### Issue: "Table doesn't exist"
- ✅ Check you ran the SQL CREATE TABLE commands
- ✅ Go to Table Editor to verify tables exist

### Issue: "Permission denied" error
- ✅ Check RLS policies are correctly set
- ✅ For public access: Use `FOR SELECT USING (true);`
- ✅ For insert: Use `FOR INSERT WITH CHECK (true);`

### Issue: "Foreign key constraint violation"
- ✅ Ensure you insert product first, then reference it in farm_output
- ✅ Or remove the foreign key constraint

---

## STEP 9: GitHub Pages Deployment

Your `public/index.html` is ready! Update it with your app URL.

For full Next.js deployment:
1. Deploy to **Vercel** (easiest) at vercel.com
2. Or use **GitHub Actions** with `next export` for static export

---

## Next Steps
1. ✅ Create tables (copy SQL above)
2. ✅ Verify in Supabase Dashboard
3. ✅ Add test data
4. ✅ Update API routes
5. ✅ Test with your components
6. ✅ Deploy!

Questions? Check your .env.local has correct credentials!
