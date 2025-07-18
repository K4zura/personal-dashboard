import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
	const token_hash = url.searchParams.get('token');
	const type = url.searchParams.get('type');

	if (token_hash && type === 'email') {
		const { error } = await supabase.auth.verifyOtp({
			type: 'email',
			token_hash: token_hash
		});

		if (error) {
			console.error('Verification error:', error.message);
			throw redirect(302, '/auth/error');
		}

		throw redirect(302, '/');
	}

	throw redirect(302, '/auth/error');
};
