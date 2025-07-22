// import { createSupabase } from './services/supabaseClient';

// const supabase = createSupabase(fetch);
// TODO: add your queries/inserts/updates/deletes here
export const income = {
	async all(locals: App.Locals) {
		// const users = await locals.supabase.from('users').select();
		const { data: income } = await locals.supabase
			.from('income')
			.select()
			.eq('user_id', locals.user?.id);

		return income;
	}
};
