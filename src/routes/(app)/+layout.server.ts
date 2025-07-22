import { getOrCreateUserProfile } from '$lib/components/auth';
import { store } from '$lib/stores/config.svelte';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const userProfile = await getOrCreateUserProfile(locals);
	store.lang = userProfile.lang;
	store.theme = userProfile.theme;
	console.log(store.lang);
	return {
		userProfile
	};
};
