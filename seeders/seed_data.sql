INSERT INTO users (name, email, role) VALUES
('John Landlord', 'john@landlord.com', 'landlord'),
('Mary Landlord', 'mary@landlord.com', 'landlord'),
('Tom Tenant', 'tom@tenant.com', 'tenant'),
('Lucy Tenant', 'lucy@tenant.com', 'tenant'),
('Sam Tenant', 'sam@tenant.com', 'tenant');

-- Seed properties
INSERT INTO properties (title, address, landlord_id) VALUES
('Cozy Apartment', '123 Main St', 1),
('Downtown Loft', '456 Elm St',1),
('Beach House', '789 Ocean View', 2);

-- Seed contracts
INSERT INTO contracts (startDate, endDate, monthlyRent, tenant_id, property_id) VALUES
('2025-01-01', '2025-12-31', 1200.00, 3, 1),
('2025-02-01', '2025-08-31', 1500.00, 4, 3);

-- Seed payments
INSERT INTO payments (contract_id, amount, paymentDate, status) VALUES
(1, 1200.00, '2025-01-05', 'paid'),
(2, 1500.00, '2025-02-05', 'paid');