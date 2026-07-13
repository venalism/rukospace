CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name      VARCHAR(150) NOT NULL,
    email          VARCHAR(150) UNIQUE NOT NULL,
    phone          VARCHAR(20),
    password_hash  VARCHAR(255) NOT NULL,
    role           VARCHAR(20) NOT NULL CHECK (role IN ('tenant','owner','agent','admin')),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE properties (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id                UUID NOT NULL REFERENCES users(id),
    title                   VARCHAR(200) NOT NULL,
    description             TEXT,
    address                 VARCHAR(255) NOT NULL,
    latitude                DOUBLE PRECISION NOT NULL,
    longitude               DOUBLE PRECISION NOT NULL,
    price_per_month         NUMERIC(14,2) NOT NULL,
    area_sqm                NUMERIC(8,2) NOT NULL,
    electricity_power_watt  INTEGER,
    water_source            VARCHAR(50),
    parking_spaces          INTEGER DEFAULT 0,
    zoning_type             VARCHAR(50),
    legality_status         VARCHAR(30) NOT NULL DEFAULT 'unverified',
    listing_status          VARCHAR(30) NOT NULL DEFAULT 'draft',
    qr_code_url             VARCHAR(255),
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_properties_status ON properties (listing_status);
CREATE INDEX idx_properties_lat_lng ON properties (latitude, longitude);

CREATE TABLE property_photos (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id    UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    url            VARCHAR(255) NOT NULL,
    display_order  INTEGER DEFAULT 0
);

CREATE TABLE property_documents (
    id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id           UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    doc_type              VARCHAR(30) NOT NULL,
    file_url              VARCHAR(255) NOT NULL,
    verification_status   VARCHAR(30) NOT NULL DEFAULT 'pending'
);

CREATE TABLE survey_bookings (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id         UUID NOT NULL REFERENCES properties(id),
    tenant_id           UUID NOT NULL REFERENCES users(id),
    requested_datetime  TIMESTAMPTZ NOT NULL,
    status              VARCHAR(20) NOT NULL DEFAULT 'pending',
    notes               TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE verification_logs (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id   UUID NOT NULL REFERENCES properties(id),
    admin_id      UUID NOT NULL REFERENCES users(id),
    action        VARCHAR(20) NOT NULL,
    notes         TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
