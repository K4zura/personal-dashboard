import * as db from '$lib/api/db';
import type { Budget } from '$lib/types/finances.js';
// import type { PageServerLoad } from './$types';

export const load = async ({ locals }) => {
	const categories: Budget[] = await db.expense.inCategory(locals);
	return { categories: categories ?? [] };
};
