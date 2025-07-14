import * as db from '$lib/db';

export async function load() {
	const income = await db.income.all();
	console.log(income);
	return {
		props: { income }
	};
}
