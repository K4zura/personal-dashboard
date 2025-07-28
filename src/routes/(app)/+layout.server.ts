import { getOrCreateUserProfile } from '$lib/features/auth/components';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const userProfile = await getOrCreateUserProfile(locals);
	return {
		userProfile
	};
};
