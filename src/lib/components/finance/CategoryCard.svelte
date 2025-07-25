<script lang="ts">
	import { formatCurrency, formatPercent } from '$lib/utils/format';
	import { _ } from 'svelte-i18n';
	import { slide } from 'svelte/transition';
	import ExpenseCard from './ExpenseCard.svelte';
	import type { Budget } from '$lib/types/finances';
	import { store } from '$lib/stores/store.svelte';

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
		{@const percentage = (spent / category.limit) * 100}
		{@const remaining = category.limit - spent}
		<article class=" bg-dark rounded-xl shadow-sm select-none">
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
				<div
					class="bg-border mb-1 h-3 overflow-hidden rounded-full"
					role="progressbar"
					aria-valuenow={Number(percentage)}
					aria-valuemin="0"
					aria-valuemax="100"
				>
					<div
						class="h-full transition-all duration-300"
						style={`width: ${percentage}%; background-color: ${category.color}`}
					></div>
				</div>
				<footer class="flex items-center justify-between text-xs text-gray-500">
					<p>
						{formatPercent(percentage)}
						{$_('common.used').toLowerCase()}
					</p>
					<p>
						{$_('common.remaining').toLowerCase()}: {formatCurrency(remaining)}
					</p>
				</footer>
			</header>
			{#if expandedIndex === index}
				<section class="text-light px-8 pb-6 text-sm transition-all" transition:slide>
					<h2 class="text-lg font-bold">{$_('finances.expenses.expense_details')}</h2>
					<ul class="mt-1 grid grid-cols-2 gap-3">
						{#each category.expense as expense (expense.id)}
							<ExpenseCard
								{expense}
								{percentage}
								{spent}
								color={category.color}
								id_category={category.id}
							/>
						{/each}
					</ul>
				</section>
			{/if}
		</article>
	{/each}
</div>
