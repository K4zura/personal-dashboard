import * as db from '$lib/api/db';
import type { Budget, Expense } from '$lib/types/finances.js';
// import type { PageServerLoad } from './$types';

export const load = async ({ locals }) => {
	const expense: Expense[] = await db.expense.all(locals);
	const categories: Budget[] = await db.expense.inCategory(locals);
	return { expenseList: expense ?? [], categoryList: categories ?? [] };
};
