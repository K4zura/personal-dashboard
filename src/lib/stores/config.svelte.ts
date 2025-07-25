import type { Budget, Goal } from '$lib/types/finances';

export interface Config {
	lang: string;
	theme: string;
	userID: string;
	goals: Goal[];
	budgets: Budget[];
}

const emptyState: Config = {
	lang: '',
	theme: 'theme-neo-tokyo',
	userID: '',
	goals: [],
	budgets: []
};

function createStore() {
	const store = $state<Config>(emptyState);
	return {
		get state() {
			return store;
		},

		get lang() {
			return store.lang;
		},

		set lang(value: string) {
			store.lang = value;
		},

		get theme() {
			return store.theme;
		},

		set theme(value: string) {
			store.theme = value;
		},

		get userID() {
			return store.userID;
		},

		set userID(value: string) {
			store.userID = value;
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
		}
	};
}

export const store = createStore();
