import type { Budget, Expense, Goal, Income } from '$lib/types/finances';
import { createSupabase } from '../services/supabaseClient';
import { storeConfig } from '../stores/config.svelte';

const supabase = createSupabase(fetch);

export const income = {
	async all(locals: App.Locals) {
		const { data: income } = await locals.supabase
			.from('income')
			.select()
			.eq('user_id', locals.user?.id);

		return income as Income[];
	}
};

export const config = {
	async changeLang(newLang: string) {
		const { error } = await supabase
			.from('users')
			.update({
				lang: newLang
			})
			.eq('id', storeConfig.userID);

		if (error) throw new Error(`Error al guardar ahorro: ${error.message}`);
	},

	async changeTheme(newTheme: string) {
		const { error } = await supabase
			.from('users')
			.update({
				theme: newTheme
			})
			.eq('id', storeConfig.userID);

		if (error) throw new Error(`Error al guardar ahorro: ${error.message}`);
	}
};

export const expense = {
	async all(locals: App.Locals) {
		const { data: expense } = await locals.supabase
			.from('expense')
			.select()
			.eq('user_id', locals.user?.id);

		return expense as Expense[];
	},

	async inCategory(locals: App.Locals) {
		const { data: expense } = await locals.supabase
			.from('budget')
			.select(`*, expense(*)`)
			.eq('user_id', locals.user?.id);

		return expense as Budget[];
	},

	async delete(id_expense: string) {
		const { error } = await supabase
			.from('expense')
			.delete()
			.eq('id', id_expense)
			.eq('user_id', storeConfig.userID);

		if (error) throw new Error(`Error al eliminar gasto: ${error.message}`);
	}
};

export const budget = {
	async deleteCategory(id_category: string) {
		const { error } = await supabase
			.from('budget')
			.delete()
			.eq('id', id_category)
			.eq('user_id', storeConfig.userID);

		if (error) throw new Error(`Error al eliminar categoria: ${error.message}`);
	},
	async refresh() {
		const { data: budget } = await supabase
			.from('budget')
			.select()
			.eq('user_id', storeConfig.userID)
			.order('id', { ascending: true });

		return budget as Budget[];
	}
};

export const saving = {
	async all(locals: App.Locals) {
		const { data: saving } = await locals.supabase
			.from('saving')
			.select()
			.eq('user_id', locals.user?.id)
			.order('id', { ascending: true });

		return saving as Goal[];
	},

	async addSaved(newSaved: number, id_goal: string) {
		const { error } = await supabase
			.from('saving')
			.update({
				saved: newSaved
			})
			.eq('id', id_goal)
			.eq('user_id', storeConfig.userID);

		if (error) throw new Error(`Error al guardar ahorro: ${error.message}`);
	},

	async deleteGoal(id_goal: string) {
		const { error } = await supabase
			.from('saving')
			.delete()
			.eq('id', id_goal)
			.eq('user_id', storeConfig.userID);

		if (error) throw new Error(`Error al guardar ahorro: ${error.message}`);
	},

	async refresh() {
		const { data: saving } = await supabase
			.from('saving')
			.select()
			.eq('user_id', storeConfig.userID)
			.order('id', { ascending: true });

		return saving as Goal[];
	}
};
