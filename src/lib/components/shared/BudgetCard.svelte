<script lang="ts">
	import { formatCurrency, formatPercent } from '$lib/utils/format.js';
	import { _ } from 'svelte-i18n';
	import { Edit, Trash } from 'lucide-svelte';
	import type { Budget } from '$lib/types/finances';
	import * as db from '$lib/api/db';
	import { store } from '$lib/stores/config.svelte';

	interface Props {
		category: Budget;
	}

	const { category }: Props = $props();
	let localCategory: Budget = $state({ ...category });
	const id_category = category.id;

	const totalSpent = $derived(localCategory.expense.reduce((acc, g) => acc + g.amount, 0));
	const totalSpentPercentage = $derived((totalSpent / localCategory.limit) * 100);

	const deleteCategory = async () => {
		await db.budget.deleteCategory(id_category);
		store.budgets = await db.budget.refresh();
	};
</script>

<article
	class="shadow-tertiary flex flex-col items-center gap-2 rounded px-4 py-3 shadow-[-1px_1px_1px_1px]"
>
	<div class="flex w-full flex-wrap items-center justify-between gap-2">
		<div class="flex items-center gap-2 self-start">
			<span class="h-4 w-4 rounded-full" style="background-color: {localCategory.color}"></span>
			<h1 class="text-lg font-semibold sm:text-xl">{localCategory.name}</h1>
		</div>

		<div class="ml-auto flex items-center gap-6">
			<div class="text-success flex flex-col items-center">
				<h2 class="text-sm font-medium">{$_('finances.budget.title')}</h2>
				<p class="text-lg font-bold sm:text-xl">
					{formatCurrency(localCategory.limit)}
				</p>
			</div>
			<div
				class="{localCategory.limit < totalSpent
					? 'text-error'
					: 'text-warning'} flex flex-col items-center"
			>
				<h2 class="text-sm font-medium">{$_('common.used')}</h2>
				<p class="text-lg font-bold sm:text-xl">
					{formatCurrency(totalSpent)}
				</p>
			</div>
			<div class="flex items-center justify-end gap-1">
				<button
					aria-label="edit"
					class="hover:bg-border cursor-pointer rounded-lg p-2 text-blue-500"
				>
					<Edit class="size-4" />
				</button>
				<button
					aria-label="delete"
					class="text-error hover:bg-border cursor-pointer rounded-lg p-2"
					onclick={deleteCategory}
				>
					<Trash class="size-4" />
				</button>
			</div>
		</div>
	</div>
	<div class="flex w-full items-center gap-2">
		<p class="w-11 text-xs">{formatPercent(totalSpentPercentage)}</p>
		<div
			class="bg-border relative mb-1 h-3 w-full overflow-hidden rounded-full"
			role="progressbar"
			aria-valuenow={Number(totalSpentPercentage)}
			aria-valuemin="0"
			aria-valuemax="100"
		>
			<div
				class="h-full transition-all duration-300"
				style={`width: ${totalSpentPercentage}%; background-color: ${localCategory.color}`}
			></div>
		</div>
	</div>
</article>
