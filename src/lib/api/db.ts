import { createSupabase } from '../services/supabaseClient';
import { store } from '../stores/config.svelte';

const supabase = createSupabase(fetch);

export const income = {
	async all(locals: App.Locals) {
		const { data: income } = await locals.supabase
			.from('income')
			.select()
			.eq('user_id', locals.user?.id);

		return income;
	}
};

export const config = {
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

export const expense = {
	async all(locals: App.Locals) {
		const { data: expense } = await locals.supabase
			.from('expense')
			.select()
			.eq('user_id', locals.user?.id);

		return expense;
	},

	async inCategory(locals: App.Locals) {
		const { data: expense } = await locals.supabase
			.from('budget')
			.select(`*, expense(*)`)
			.eq('user_id', locals.user?.id);

		return expense;
	}
};
