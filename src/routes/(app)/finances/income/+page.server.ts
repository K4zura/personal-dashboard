import type { Income } from '$lib/features/finance';
import { db } from '$lib/features/finance';

export const load = async ({ locals }) => {
	const income: Income[] = await db.income.all(locals);
	return { incomeList: income ?? [] };
};
