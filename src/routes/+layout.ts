// src/routes/+layout.ts
import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
// import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';

export const load: LayoutLoad = async ({
	fetch,
	data,
	depends
}): Promise<{ supabase: SupabaseClient; session: Session; user: User | null }> => {
	depends('supabase:auth');

	const supabase = isBrowser()
		? createBrowserClient(
				import.meta.env.VITE_PUBLIC_SUPABASE_URL,
				import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
				{
					global: {
						fetch
					}
				}
			)
		: createServerClient(
				import.meta.env.VITE_PUBLIC_SUPABASE_URL,
				import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
				{
					global: {
						fetch
					},
					cookies: {
						getAll() {
							return data;
						}
					}
				}
			);

	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutData`, which
	 * safely checked the session using `safeGetSession`.
	 */
	const {
		data: { session }
	} = await supabase.auth.getSession();

	const user = session?.user ?? null;
	return { supabase, session: session!, user };
};
