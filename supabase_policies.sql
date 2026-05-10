-- Create gallery table for image uploads
CREATE TABLE IF NOT EXISTS gallery (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  image_url TEXT NOT NULL,
  title VARCHAR(255),
  description TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Policies for gallery
CREATE POLICY "Allow public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow admin insert gallery" ON gallery FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));
CREATE POLICY "Allow admin update gallery" ON gallery FOR UPDATE USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));
CREATE POLICY "Allow admin delete gallery" ON gallery FOR DELETE USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

-- Policies for products (already in setup, but ensuring)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow admin write products" ON products FOR ALL USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

-- Policies for farm_output
ALTER TABLE farm_output ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read farm_output" ON farm_output FOR SELECT USING (true);
CREATE POLICY "Allow admin write farm_output" ON farm_output FOR ALL USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

-- Policies for orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin read orders" ON orders FOR SELECT USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

-- Policies for contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin read contact_messages" ON contact_messages FOR SELECT USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

-- Policies for admin_profiles
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated read own admin_profiles" ON admin_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Allow authenticated insert admin_profiles" ON admin_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Allow authenticated update own admin_profiles" ON admin_profiles FOR UPDATE USING (auth.uid() = id);

-- Policies for customers (assuming admin only)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow admin all customers" ON customers FOR ALL USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

-- Policies for messages (similar to contact_messages)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin read messages" ON messages FOR SELECT USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

-- Policies for outputs (assuming same as farm_output)
ALTER TABLE outputs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read outputs" ON outputs FOR SELECT USING (true);
CREATE POLICY "Allow admin write outputs" ON outputs FOR ALL USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

-- Relationships (foreign keys already in setup)
-- farm_output.product_id -> products.id (many to one)
-- admin_profiles.id -> auth.users(id) (one to one)
-- gallery.uploaded_by -> auth.users(id) (many to one)

-- Note: orders.order_items is JSONB, no FK
-- To enable storage bucket for images:
-- In Supabase Dashboard > Storage > Create bucket named 'images' with public access