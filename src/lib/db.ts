import { createSupabase } from './services/supabaseClient';
import { store } from './stores/config.svelte';

const supabase = createSupabase(fetch);

export const income = {
	async all(locals: App.Locals) {
		const { data: income } = await locals.supabase
			.from('income')
			.select()
			.eq('user_id', locals.user?.id);

		return income;
	},
	async changeLang(newLang: string) {
		const { error } = await supabase
			.from('users')
			.update({
				lang: newLang
			})
			.eq('id', store.userID);

		if (error) {
			console.log(error);
		}
	},
	async changeTheme(newTheme: string) {
		const { error } = await supabase
			.from('users')
			.update({
				theme: newTheme
			})
			.eq('id', store.userID);

		if (error) {
			console.log(error);
		}
	}
};
