import { createServerClient, createBrowserClient, isBrowser } from '@supabase/ssr';
import type { Cookies } from '@sveltejs/kit';

export function createSupabase(fetchFn: typeof fetch, cookies?: Cookies) {
    return isBrowser()
        ? createBrowserClient(
            import.meta.env.VITE_PUBLIC_SUPABASE_URL,
            import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
            { global: { fetch: fetchFn } }
        )
        : createServerClient(
            import.meta.env.VITE_PUBLIC_SUPABASE_URL,
            import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
            {
                global: { fetch: fetchFn },
                cookies: {
                    getAll: async () => cookies?.getAll() ?? []
                }
            }
        );
}