import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabase, user }, request }) => {
	const formData = await request.formData();
	const name = formData.get('name') as string;
	const type = formData.get('type') as string;
	const date = formData.get('date') as string;
	const amount = formData.get('amount') as string;
	const color = formData.get('color') as string;
	const category = formData.get('category') as string;

	const { error } = await supabase.from('expense').insert({
		name: name,
		type: type,
		date: date,
		amount: amount,
		color: color,
		category: category,
		user_id: user?.id
	});

	if (!error) {
		redirect(302, '/finances/expense');
	}

	redirect(302, '/auth/error');
};
