-- Script: create_users.sql
-- Crea tabla users, datos de ejemplo y políticas RLS mínimas para desarrollo

-- Tabla mínima
CREATE TABLE IF NOT EXISTS public.users (
  id serial PRIMARY KEY,
  username text UNIQUE,
  email text UNIQUE,
  name text,
  created_at timestamptz DEFAULT now()
);

-- Datos de prueba
INSERT INTO public.users (username, email, name)
VALUES
  ('alumno1', 'alumno1@example.test', 'Alumno Uno')
ON CONFLICT DO NOTHING;

-- Habilitar Row Level Security (opcional para desarrollo)
-- Nota: ajustar políticas antes de usar en producción.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Permitir SELECT a todos (desarrollo)
CREATE POLICY "Allow select" ON public.users
  FOR SELECT USING (true);

-- Permitir INSERT/UPDATE/DELETE a usuarios autenticados
CREATE POLICY "Auth all for authenticated" ON public.users
  FOR ALL USING (auth.role() = 'authenticated');

-- Fin del script
