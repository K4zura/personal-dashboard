import type { Budget, Expense } from '$lib/features/finance';
import { db } from '$lib/features/finance';

export const load = async ({ locals }) => {
	const expense: Expense[] = await db.expense.all(locals);
	const categories: Budget[] = await db.expense.inCategory(locals);
	return { expenseList: expense ?? [], categoryList: categories ?? [] };
};
