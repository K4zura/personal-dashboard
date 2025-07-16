import * as db from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: user }) => {
	const income = await db.income.all(user.user?.id);
	return { incomeList: income ?? [] };
};
