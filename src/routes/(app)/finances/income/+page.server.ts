import * as db from '$lib/api/db';
import type { Income } from '$lib/types/finances.js';
// import type { PageServerLoad } from './$types';

export const load = async ({ locals }) => {
	const income: Income[] = await db.income.all(locals);
	return { incomeList: income ?? [] };
};
