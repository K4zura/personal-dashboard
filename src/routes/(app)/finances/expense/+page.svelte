<script lang="ts">
	import CategoryCard from '$lib/components/finance/CategoryCard.svelte';
	import AddModal from '$lib/components/shared/AddModal.svelte';
	import SectionCard from '$lib/components/shared/SectionCard.svelte';
	import StatCard from '$lib/components/shared/StatCard.svelte';
	import Table from '$lib/components/shared/Table.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import { modalIncomeOpen } from '$lib/stores/interactions';
	import { AlertTriangle, CreditCard, ShoppingCart, TrendingDown } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';

	const { data } = $props();
	const { expenseList, categoryList } = $derived(data);

	const categories = $derived(
		categoryList.map((category) => {
			let spent = 0;
			category.expense.map((g: { amount: any }) => (spent += g.amount));

			return {
				category: category.name,
				spent,
				limit: category.limit ?? 0,
				color: category.color,
				expenseList: category.expense
			};
		})
	);

	const totalSpent = $derived(categories.reduce((acc, e) => acc + e.spent, 0));
	const totalLimit = $derived(categories.reduce((acc, e) => acc + e.limit, 0));
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
		['color', 'color', 'col-span-2'],
		['category', 'text', 'col-span-2', 'category']
	]}
/>

<div class="flex items-center justify-between">
	<h1 class="text-primary text-xl font-bold">{$_('finances.expenses.title')}</h1>
	<button
		class="bg-primary cursor-pointer rounded px-3 py-1.5 text-sm"
		onclick={() => ($modalIncomeOpen = true)}>Add Expense</button
	>
</div>

<div class="grid grid-cols-1 gap-4 space-y-1 sm:grid-cols-2 xl:grid-cols-4">
	<StatCard
		title={$_('common.total')}
		value="${totalSpent}"
		percentage="+{totalSpentPercentage.toFixed(1)}%"
	>
		{#snippet icon()}
			<TrendingDown class="size-4 text-gray-300" />
		{/snippet}
		{$_('common.vs_last_month')}
	</StatCard>
	<StatCard title={$_('finances.budget.title')} value="${totalLimit}">
		{#snippet icon()}
			<CreditCard class="size-4 text-gray-300" />
		{/snippet}
		<ProgressBar />
	</StatCard>
	<StatCard title={$_('common.average')} value="$16">
		{#snippet icon()}
			<ShoppingCart class="size-4 text-gray-300" />
		{/snippet}
		{$_('common.based_on_30')}
	</StatCard>
	<StatCard title={$_('finances.expenses.categories')} value="5">
		{#snippet icon()}
			<AlertTriangle class="size-4 text-gray-300" />
		{/snippet}
		2 {$_('finances.expenses.over_budget')}
	</StatCard>
	<SectionCard
		title={$_('finances.expenses.expenses_by_category')}
		subtitle={$_('finances.expenses.category_desc')}
		colSpan="sm:col-span-2 xl:col-span-4"
	>
		<CategoryCard {categories} />
	</SectionCard>
	<SectionCard
		title={$_('finances.expenses.expenses_history')}
		subtitle={$_('finances.expenses.history_desc')}
		colSpan="sm:col-span-2 xl:col-span-4"
	>
		{#snippet filter()}
			<button
				class="bg-secondary hover:bg-tertiary text-light flex cursor-pointer gap-2 rounded px-3 py-2 text-sm font-semibold"
			>
				{$_('common.filter')}
			</button>
		{/snippet}

		<Table data={expenseList} category={true} />
	</SectionCard>
</div>
