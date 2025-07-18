import { redirect, type RequestHandler } from '@sveltejs/kit';
// import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {
	const formData = await request.formData();
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	const { error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password
	});

	console.log('error', error);

	if (!error) {
		redirect(302, '/dashboard'); // use the redirect API for your server framework
	}

	redirect(302, '/auth/error');
};
