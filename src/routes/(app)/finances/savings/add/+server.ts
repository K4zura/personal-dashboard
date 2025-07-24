import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabase, user }, request }) => {
	const formData = await request.formData();
	const name = formData.get('name') as string;
	const total = formData.get('total') as string;
	const monthly = formData.get('monthly') as string;
	const deadline = formData.get('deadline') as string;
	const color = formData.get('color') as string;

	const { error } = await supabase.from('saving').insert({
		name: name,
		total: total,
		monthly: monthly,
		deadline: deadline,
		color: color,
		user_id: user?.id
	});

	if (!error) {
		redirect(302, '/finances/savings');
	}

	redirect(302, '/auth/error');
};
