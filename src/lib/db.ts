import { createSupabase } from './services/supabaseClient';

const supabase = createSupabase(fetch);
// TODO: add your queries/inserts/updates/deletes here
export const income = {
	async all(userId: string | undefined) {
		const { data: income } = await supabase.from('income').select().eq('userId', userId);

		return income;
	}
};
