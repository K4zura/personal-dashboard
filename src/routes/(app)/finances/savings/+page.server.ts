import type { Goal } from '$lib/features/finance';
import { db } from '$lib/features/finance';

export const load = async ({ locals }) => {
	const saving: Goal[] = await db.saving.all(locals);
	return { goals: saving ?? [] };
};
