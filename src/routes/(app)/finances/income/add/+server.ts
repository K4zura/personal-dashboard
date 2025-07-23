import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabase, user }, request }) => {
	const formData = await request.formData();
	const name = formData.get('name') as string;
	const type = formData.get('type') as string;
	const date = new Date(formData.get('date') as string);
	const amount = formData.get('amount') as string;
	const color = formData.get('color') as string;

	const income = await supabase
		.from('income')
		.insert({
			name: name,
			type: type,
			date: date,
			amount: amount,
			color: color,
			user_id: user?.id
		})
		.select();

	if (income) {
		redirect(302, '/finances/income'); // use the redirect API for your server framework
	}

	redirect(302, '/auth/error');
};
