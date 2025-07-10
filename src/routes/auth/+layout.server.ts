import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
	const { session, user } = await safeGetSession();

	if (user) throw redirect(302, '/dashboard');

	return {
		session,
		user,
		cookies: cookies.getAll()
	};
};
