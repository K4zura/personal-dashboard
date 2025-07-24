import * as db from '$lib/api/db';
// import type { PageServerLoad } from './$types';

export const load = async ({ locals }) => {
	const income = await db.income.all(locals);
	return { incomeList: income ?? [] };
};
