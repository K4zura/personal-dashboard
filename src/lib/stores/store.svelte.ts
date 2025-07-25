import type { Budget, Expense, Goal, Income } from '$lib/types/finances';

export interface Store {
	goals: Goal[];
	budgets: Budget[];
	incomes: Income[];
	expenses: Expense[];
}

const emptyState: Store = {
	goals: [],
	budgets: [],
	incomes: [],
	expenses: []
};

function createStore() {
	const store = $state<Store>(emptyState);
	return {
		get state() {
			return store;
		},

		get goals() {
			return store.goals;
		},

		set goals(value: Goal[]) {
			store.goals = value;
		},

		get budgets() {
			return store.budgets;
		},

		set budgets(value: Budget[]) {
			store.budgets = value;
		},

		get incomes() {
			return store.incomes;
		},

		set incomes(value: Income[]) {
			store.incomes = value;
		},

		get expenses() {
			return store.expenses;
		},

		set expenses(value: Expense[]) {
			store.expenses = value;
		}
	};
}

export const store = createStore();
