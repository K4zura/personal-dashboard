import type { Budget } from '$lib/features/finance';
import { db } from '$lib/features/finance';

export const load = async ({ locals }) => {
	const categories: Budget[] = await db.expense.inCategory(locals);
	return { categories: categories ?? [] };
};
