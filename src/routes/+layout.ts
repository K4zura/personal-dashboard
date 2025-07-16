import type { LayoutLoad } from './$types';
import { createSupabase } from '$lib/services/supabaseClient';

export const load: LayoutLoad = async ({ fetch }) => {
	const supabase = createSupabase(fetch)

	const {
		data: { session }
	} = await supabase.auth.getSession();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	return { session, supabase, user };
};
