import { store } from '$lib/stores/config.svelte';
import { register, init, getLocaleFromNavigator, locale, waitLocale } from 'svelte-i18n';

register('en', () => import('./en.json'));
register('es', () => import('./es.json'));
register('fr', () => import('./fr.json'));
register('jp', () => import('./jp.json'));

init({
	fallbackLocale: 'es',
	initialLocale: store.lang || getLocaleFromNavigator()
});

export const changeLocale = async (lang: string) => {
	locale.set(lang);
	await waitLocale();
};
