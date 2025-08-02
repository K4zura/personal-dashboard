<script lang="ts">
	import type { Budget } from '$lib/features/finance';
	import { ExpenseCard, store } from '$lib/features/finance';
	import { formatCurrency, formatPercent } from '$lib/shared/utils/format';
	import ProgressBar from '$lib/ui/ProgressBar.svelte';
	import { _ } from 'svelte-i18n';
	import { slide } from 'svelte/transition';

	interface Props {
		categoryList: Budget[];
	}

	const { categoryList }: Props = $props();

	$effect(() => {
		store.budgets = categoryList;
	});

	let expandedIndex: number | null = $state(null);
</script>

<div class="flex w-full flex-col gap-4">
	{#each store.budgets as category, index (category.id)}
		{@const spent = category.expense.reduce((acc, g) => acc + g.amount, 0)}
		{@const remaining = category.limit - spent}
		<article class=" bg-card-bg rounded-xl shadow-sm select-none">
			<header
				role="button"
				tabindex="0"
				aria-expanded={expandedIndex === index}
				class="cursor-pointer p-4"
				onclick={() => (expandedIndex = expandedIndex === index ? null : index)}
				onkeydown={(e) =>
					e.key === 'Enter' && (expandedIndex = expandedIndex === index ? null : index)}
			>
				<div class="mb-1 flex items-center justify-between">
					<div class="flex items-center gap-2">
						<span class="h-4 w-4 rounded-full" style="background-color: {category.color}"></span>
						<span class="font-medium">{category.name}</span>
					</div>
					<span class="text-sm font-semibold"
						>{formatCurrency(spent)} / {formatCurrency(category.limit)}</span
					>
				</div>
				<ProgressBar
					totalSpent={spent}
					totalBudget={category.limit}
					size={3}
					color={category.color}
					{remaining}
				/>
			</header>
			{#if expandedIndex === index}
				<section class="text-text-secondary px-8 pb-6 text-sm transition-all" transition:slide>
					<h2 class="text-lg font-bold">{$_('finances.expenses.expense_details')}</h2>
					<ul class="text-text mt-1 grid grid-cols-2 gap-3">
						{#each category.expense as expense (expense.id)}
							<ExpenseCard {expense} {spent} color={category.color} id_category={category.id} />
						{/each}
					</ul>
				</section>
			{/if}
		</article>
	{/each}
</div>
