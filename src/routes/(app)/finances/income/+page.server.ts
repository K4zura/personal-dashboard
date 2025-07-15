import * as db from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const income = await db.income.all();
	return { incomeList: income ?? [] };
};
