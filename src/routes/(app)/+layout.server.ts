import { createSupabase } from '$lib/services/supabaseClient';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const supabase = createSupabase(event.fetch, event.cookies);

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return {
		session,
		user: session?.user ?? null
	};
};
