import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabase, user }, request }) => {
	const formData = await request.formData();
	const name = formData.get('name') as string;
	const limit = formData.get('limit') as string;
	const color = formData.get('color') as string;

	const { error } = await supabase.from('budget').insert({
		name: name,
		limit: limit,
		color: color,
		user_id: user?.id
	});

	if (!error) {
		redirect(302, '/finances/budget');
	}

	redirect(302, '/auth/error');
};
