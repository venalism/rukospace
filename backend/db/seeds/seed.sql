-- Seed initial Administrator account
INSERT INTO users (id, full_name, email, phone, password_hash, role)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'System Administrator',
    'admin@rukospace.com',
    '081234567890',
    '$2a$12$rtVIv75VaFkza0mcJstXHOeElXNaghdItbxWtdOeUTOnqVI0QibtK', -- This is 'password123' bcrypt hashed
    'admin'
) ON CONFLICT (email) DO NOTHING;

-- Seed an Owner account
INSERT INTO users (id, full_name, email, phone, password_hash, role)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    'Budi Pemilik',
    'budi@example.com',
    '081298765432',
    '$2a$12$rtVIv75VaFkza0mcJstXHOeElXNaghdItbxWtdOeUTOnqVI0QibtK',
    'owner'
) ON CONFLICT (email) DO NOTHING;

-- Seed a Tenant account
INSERT INTO users (id, full_name, email, phone, password_hash, role)
VALUES (
    '33333333-3333-3333-3333-333333333333',
    'Citra Penyewa',
    'citra@example.com',
    '081312345678',
    '$2a$12$rtVIv75VaFkza0mcJstXHOeElXNaghdItbxWtdOeUTOnqVI0QibtK',
    'tenant'
) ON CONFLICT (email) DO NOTHING;

-- Seed some dummy properties for the owner
INSERT INTO properties (id, owner_id, title, description, address, latitude, longitude, price_per_month, area_sqm, electricity_power_watt, water_source, parking_spaces, zoning_type, legality_status, listing_status)
VALUES (
    '44444444-4444-4444-4444-444444444441',
    '22222222-2222-2222-2222-222222222222',
    'Ruko Mega Kuningan Blok A',
    'Ruko 3 lantai strategis di pusat bisnis Mega Kuningan, cocok untuk cafe atau kantor.',
    'Jl. Dr. Ide Anak Agung Gde Agung, Kuningan, Jakarta Selatan',
    -6.227447,
    106.825838,
    25000000.00,
    150.00,
    16500,
    'PAM',
    4,
    'Komersial',
    'verified',
    'active'
),
(
    '44444444-4444-4444-4444-444444444442',
    '22222222-2222-2222-2222-222222222222',
    'Ruko Kemang Raya',
    'Ruko luas cocok untuk FnB di Kemang. Parkir luas.',
    'Jl. Kemang Raya No. 12, Jakarta Selatan',
    -6.2625,
    106.8152,
    30000000.00,
    200.00,
    22000,
    'Tanah',
    10,
    'Komersial',
    'verified',
    'active'
),
(
    '44444444-4444-4444-4444-444444444443',
    '22222222-2222-2222-2222-222222222222',
    'Ruko SCBD Sudirman',
    'Ruko mewah di SCBD, cocok untuk kantor perusahaan multinasional.',
    'SCBD Lot 11, Jakarta Selatan',
    -6.2255,
    106.8096,
    50000000.00,
    300.00,
    66000,
    'PAM',
    15,
    'Komersial',
    'pending',
    'draft'
),
(
    '44444444-4444-4444-4444-444444444444',
    '22222222-2222-2222-2222-222222222222',
    'Ruko Pasar Minggu (Sengketa)',
    'Ruko lama butuh renovasi. Sertifikat sedang dalam proses.',
    'Jl. Pasar Minggu Raya, Jakarta Selatan',
    -6.2845,
    106.8441,
    15000000.00,
    100.00,
    5500,
    'Tanah',
    2,
    'Komersial',
    'rejected',
    'draft'
) ON CONFLICT (id) DO NOTHING;

-- Seed a Survey Booking for Tenant Citra on Budi's Property
INSERT INTO survey_bookings (id, property_id, tenant_id, requested_datetime, status, notes)
VALUES (
    '55555555-5555-5555-5555-555555555555',
    '44444444-4444-4444-4444-444444444441',
    '33333333-3333-3333-3333-333333333333',
    '2026-07-20 10:00:00',
    'pending',
    'Halo Pak Budi, saya tertarik melihat ruko ini untuk cafe kopi saya. Terima kasih.'
) ON CONFLICT (id) DO NOTHING;
