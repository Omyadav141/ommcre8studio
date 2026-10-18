CREATE TABLE public.inquiries (
 id uuid PRIMARY KEY,
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (length(email) <= 255),
 phone text NOT NULL DEFAULT '' CHECK (length(phone) <= 30),
 company text NOT NULL DEFAULT '' CHECK (length(company) <= 120),
 website text NOT NULL DEFAULT '' CHECK (length(website) <= 255),
 service text NOT NULL CHECK (length(service) BETWEEN 1 AND 100),
 title text NOT NULL CHECK (length(title) BETWEEN 1 AND 150),
 description text NOT NULL CHECK (length(description) BETWEEN 10 AND 3000),
 budget text NOT NULL DEFAULT '',
 timeline text NOT NULL DEFAULT '',
 contact_pref text NOT NULL DEFAULT 'Email',
 consent boolean NOT NULL CHECK (consent = true),
 status text NOT NULL DEFAULT 'new',
 email_status text NOT NULL DEFAULT 'not_configured'
);
GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can submit inquiries only" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (status = 'new' AND email_status = 'not_configured' AND consent = true);