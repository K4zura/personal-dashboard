import type { Goal } from '$lib/types/savings';

export interface Config {
	lang: string;
	theme: string;
	userID: string;
	goals: Goal[];
}

const emptyState: Config = {
	lang: '',
	theme: 'theme-neo-tokyo',
	userID: '',
	goals: []
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
		}
	};
}

export const store = createStore();
