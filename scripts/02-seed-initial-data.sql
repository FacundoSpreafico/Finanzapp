-- Insert default accounts
INSERT OR IGNORE INTO accounts (id, name, type, balance) VALUES 
('acc_mercado_pago', 'Mercado Pago', 'MERCADO_PAGO', 3648.00),
('acc_efectivo', 'Efectivo', 'EFECTIVO', 0.00),
('acc_ahorro', 'Ahorro', 'AHORRO', 3648.00);

-- Insert default categories
INSERT OR IGNORE INTO categories (id, name, color) VALUES 
('cat_nafta', 'NAFTA', '#f97316'),
('cat_salidas', 'SALIDAS', '#dc2626'),
('cat_comidas', 'COMIDAS', '#16a34a'),
('cat_seom', 'SEOM', '#8b5cf6'),
('cat_compras', 'COMPRAS', '#0891b2'),
('cat_salud', 'SALUD', '#06b6d4'),
('cat_activ_fisica', 'ACTIV FISICA', '#84cc16'),
('cat_casa', 'CASA', '#f59e0b'),
('cat_tarjeta', 'TARJETA', '#ef4444'),
('cat_impuesto', 'IMPUESTO', '#6b7280'),
('cat_ciudadania', 'CIUDADANIA', '#14b8a6'),
('cat_ahorro', 'AHORRO', '#22c55e'),
('cat_trabajo', 'TRABAJO', '#3b82f6'),
('cat_rendimientos', 'RENDIMIENTOS', '#10b981');
