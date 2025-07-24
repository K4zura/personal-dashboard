import * as db from '$lib/api/db';
// import type { PageServerLoad } from './$types';

export const load = async ({ locals }) => {
	const expense = await db.expense.all(locals);
	const categories = await db.expense.inCategory(locals);
	return { expenseList: expense ?? [], categoryList: categories ?? [] };
};
