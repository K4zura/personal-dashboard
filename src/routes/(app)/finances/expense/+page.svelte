<script lang="ts">
	import { ExpenseCategory, store, Table, type Budget, type Expense } from '$lib/features/finance';
	import { modalIncomeOpen } from '$lib/shared/stores/interactions.js';
	import { formatCurrency, formatPercent } from '$lib/shared/utils/format.js';
	import { AddModal, ProgressBar, SectionCard, StatCard } from '$lib/ui';
	import { AlertTriangle, CreditCard, ShoppingCart, TrendingDown } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';

	const { data } = $props();
	const { expenseList, categoryList } = $derived(data);

	let colors: Record<string, string> = {};

	let totalSpent = $state(0);
	$effect(() => {
		totalSpent = store.budgets.reduce(
			(sum, category) => sum + category.expense.reduce((s, e) => s + e.amount, 0),
			0
		);
	});
	const totalLimit = $derived(store.budgets.reduce((acc, e) => acc + e.limit, 0));
	const totalSpentPercentage = $derived((totalSpent / totalLimit) * 100);
</script>

<svelte:head>
	<title>Dashboard | {$_('finances.expenses.title')}</title>
</svelte:head>

<AddModal
	title="Expense"
	action="expense"
	fields={[
		['name', 'text', 'col-span-2'],
		['type', 'select', 'col-span-1', 'frecuency'],
		['date', 'date', 'col-span-1'],
		['amount', 'number', 'col-span-2'],
		['category', 'select', 'col-span-2', 'category']
	]}
	values={categoryList.map((category) => category.name)}
/>

<div class="flex items-center justify-between">
	<h1 class="text-secondary text-xl font-bold">{$_('finances.expenses.title')}</h1>
	<button
		class="bg-primary text-button-text hover:bg-primary-hover cursor-pointer rounded px-3 py-1.5 text-sm"
		onclick={() => ($modalIncomeOpen = true)}>{$_('finances.expenses.add')}</button
	>
</div>

<div class="grid grid-cols-1 gap-4 space-y-1 sm:grid-cols-2 xl:grid-cols-4">
	<StatCard
		title={$_('common.total')}
		value={formatCurrency(totalSpent)}
		percentage={`+${formatPercent(totalSpentPercentage)}`}
	>
		{#snippet icon()}
			<TrendingDown class="text-text-secondary size-4" />
		{/snippet}
		{$_('common.vs_last_month')}
	</StatCard>
	<StatCard title={$_('finances.budget.title')} value={formatCurrency(totalLimit)}>
		{#snippet icon()}
			<CreditCard class="text-text-secondary size-4" />
		{/snippet}
		<ProgressBar totalBudget={totalLimit} {totalSpent} />
	</StatCard>
	<StatCard title={$_('common.average')} value={formatCurrency(16)}>
		{#snippet icon()}
			<ShoppingCart class="text-text-secondary size-4" />
		{/snippet}
		{$_('common.based_on_30')}
	</StatCard>
	<StatCard title={$_('finances.expenses.categories')} value={store.budgets.length.toString()}>
		{#snippet icon()}
			<AlertTriangle class="text-text-secondary size-4" />
		{/snippet}
		2 {$_('finances.expenses.over_budget')}
	</StatCard>
	<SectionCard
		title={$_('finances.expenses.expenses_by_category')}
		subtitle={$_('finances.expenses.category_desc')}
		colSpan="sm:col-span-2 xl:col-span-4"
	>
		<ExpenseCategory {categoryList} />
	</SectionCard>
	<SectionCard
		title={$_('finances.expenses.expenses_history')}
		subtitle={$_('finances.expenses.history_desc')}
		colSpan="sm:col-span-2 xl:col-span-4"
	>
		{#snippet filter()}
			<button
				class="bg-secondary hover:bg-primary-hover text-button-text flex cursor-pointer gap-2 rounded px-3 py-2 text-sm font-semibold"
			>
				{$_('common.filter')}
			</button>
		{/snippet}

		<Table data={expenseList} category={true} {colors} />
	</SectionCard>
</div>
