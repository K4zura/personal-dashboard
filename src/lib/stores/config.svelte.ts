export interface Config {
	lang: string;
	theme: string;
}

const emptyState: Config = {
	lang: '',
	theme: 'theme-neo-tokyo'
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
		}
	};
}

export const store = createStore();
