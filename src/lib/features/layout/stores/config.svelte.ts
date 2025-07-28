export interface Config {
	lang: string;
	theme: string;
	userID: string;
}

const emptyState: Config = {
	lang: '',
	theme: 'theme-neo-tokyo',
	userID: ''
};

function createStore() {
	const storeConfig = $state<Config>(emptyState);
	return {
		get state() {
			return storeConfig;
		},

		get lang() {
			return storeConfig.lang;
		},

		set lang(value: string) {
			storeConfig.lang = value;
		},

		get theme() {
			return storeConfig.theme;
		},

		set theme(value: string) {
			storeConfig.theme = value;
		},

		get userID() {
			return storeConfig.userID;
		},

		set userID(value: string) {
			storeConfig.userID = value;
		}
	};
}

export const storeConfig = createStore();
