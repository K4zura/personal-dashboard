<script lang="ts">
	import type { Expense } from '$lib/features/finance';
	import { db, store } from '$lib/features/finance';
	import { formatCurrency, formatPercent } from '$lib/shared/utils/format';
	import { Edit, Trash } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';

	interface Props {
		expense: Expense;
		percentage: number;
		spent: number;
		color: string;
		id_category: string;
	}

	const { expense, percentage, spent, color, id_category }: Props = $props();
	let localExpense = $state({ ...expense });
	const usedPercent = (localExpense.amount / spent) * 100;
	const id_expense = localExpense.id;

	const deleteExpense = async () => {
		try {
			await db.expense.delete(id_expense);
			store.budgets = store.budgets.map((category) => {
				if (category.id === id_category) {
					return {
						...category,
						expense: category.expense.filter((e) => e.id !== id_expense)
					};
				}
				return category;
			});
		} catch (err) {
			console.error('Error al eliminar:', err);
			alert('Hubo un error al eliminar el gasto');
		}
	};
</script>

<li class="bg-surface shadow-accent group flex flex-col gap-1 rounded p-4 shadow not-md:col-span-2">
	<div role="group" class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<span class="h-3 w-3 rounded-full" style="background-color: {color}"></span>
			<div class="flex flex-col items-start">
				<h3 class="text-base font-semibold">{localExpense.name}</h3>
				<span class="bg-accent text-surface rounded-full px-3 py-1 font-semibold">
					<!-- {type.slice(0, 3)} -->
					{$_('types.' + localExpense.type)}
				</span>
			</div>
		</div>
		<div class="touch-or-hover items-center justify-end gap-1">
			<button aria-label="edit" class="hover:bg-border cursor-pointer rounded-lg p-2 text-blue-500">
				<Edit class="size-4" />
			</button>
			<button
				aria-label="delete"
				class="text-error hover:bg-border cursor-pointer rounded-lg p-2"
				onclick={deleteExpense}
			>
				<Trash class="size-4" />
			</button>
		</div>
	</div>
	<div class="flex w-full items-center justify-between gap-2">
		<p class="text-xl font-semibold">{formatCurrency(localExpense.amount)}</p>
		<p>
			{new Date(localExpense.date).toLocaleDateString('en-US', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			})}
		</p>
	</div>
	<div
		class="bg-border h-2 w-full rounded-full"
		role="progressbar"
		aria-valuenow={Number(percentage)}
		aria-valuemin="0"
		aria-valuemax="100"
	>
		<div
			class="h-full rounded-full"
			style="width:{usedPercent.toFixed(1)}%; background-color: {color};"
		></div>
	</div>
	<span class="text-muted flex flex-col items-start text-xs">
		{formatPercent(usedPercent)}
		{$_('common.oftotal')}
	</span>
</li>
