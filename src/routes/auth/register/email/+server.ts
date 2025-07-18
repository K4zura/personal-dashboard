import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {
	const formData = await request.formData();
	const email = formData.get('email') as string;
	const username = formData.get('username') as string;
	const password = formData.get('password') as string;

	const { error } = await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			data: {
				username: username
			}
		}
	});

	console.log('errorr', error);

	if (!error) {
		redirect(302, '/dashboard'); // use the redirect API for your server framework
	}

	redirect(302, '/auth/error');
};
