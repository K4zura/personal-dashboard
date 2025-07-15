import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	import.meta.env.VITE_PUBLIC_SUPABASE_URL,
	import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
);

// TODO: add your queries/inserts/updates/deletes here
export const income = {
	async all(userId: string | undefined) {
		const { data: income } = await supabase.from('income').select().eq('userId', userId);

		return income;
	}
};
