CREATE TABLE rentals (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id    UUID NOT NULL REFERENCES properties(id),
    tenant_id      UUID NOT NULL REFERENCES users(id),
    start_date     DATE NOT NULL,
    end_date       DATE NOT NULL,
    total_price    NUMERIC(14,2) NOT NULL,
    status         VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_rentals_property ON rentals (property_id);
CREATE INDEX idx_rentals_tenant ON rentals (tenant_id);
