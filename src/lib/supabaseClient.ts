import { createClient } from '@supabase/supabase-js';
// import { VITE_PUBLIC_SUPABASE_URL, VITE_PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient(
	import.meta.env.VITE_PUBLIC_SUPABASE_URL,
	import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
);
