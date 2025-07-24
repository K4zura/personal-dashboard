import * as db from '$lib/api/db';
// import type { PageServerLoad } from './$types';

export const load = async ({ locals }) => {
	const saving = await db.saving.all(locals);
	return { goals: saving ?? [] };
};
