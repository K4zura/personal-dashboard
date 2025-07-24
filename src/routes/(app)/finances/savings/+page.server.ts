import * as db from '$lib/api/db';
import type { Goal } from '$lib/types/finances.js';
// import type { PageServerLoad } from './$types';

export const load = async ({ locals }) => {
	const saving: Goal[] = await db.saving.all(locals);
	return { goals: saving ?? [] };
};
