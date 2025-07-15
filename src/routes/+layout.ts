import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
// import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
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

	const {
		data: { session }
	} = await supabase.auth.getSession();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	return { session, supabase, user };
};
