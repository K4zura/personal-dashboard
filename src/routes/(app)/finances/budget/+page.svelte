<script lang="ts">
	import AddModal from '$lib/components/shared/AddModal.svelte';
	import BudgetCard from '$lib/components/shared/BudgetCard.svelte';
	import SectionCard from '$lib/components/shared/SectionCard.svelte';
	import StatCard from '$lib/components/shared/StatCard.svelte';
	import { modalIncomeOpen } from '$lib/stores/interactions';
	import { formatCurrency, formatPercent } from '$lib/utils/format.js';
	import { AlertTriangle, DollarSign, Edit, Target, Trash } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';
	import { store } from '$lib/stores/config.svelte';

	const { data } = $props();
	const { categories } = $derived(data);
	$effect(() => {
		store.budgets = categories;
	});
	const totalBudget = $derived(store.budgets.reduce((acc, category) => acc + category.limit, 0));
</script>

<svelte:head>
	<title>Dashboard | {$_('finances.budget.title')}</title>
</svelte:head>

<AddModal
	title="Budget"
	action="budget"
	fields={[
		['name', 'text', 'col-span-2'],
		['limit', 'number', 'col-span-2'],
		['color', 'color', 'col-span-2']
	]}
/>

<div class="flex items-center justify-between">
	<h1 class="text-primary text-xl font-bold">{$_('finances.budget.title')}</h1>
	<button
		class="bg-primary cursor-pointer rounded px-3 py-1.5 text-sm"
		onclick={() => ($modalIncomeOpen = true)}>{$_('finances.budget.add')}</button
	>
</div>

<div class="grid grid-cols-1 gap-4 space-y-1 lg:grid-cols-3">
	<StatCard
		title={$_('finances.budget.total')}
		value={formatCurrency(totalBudget)}
		percentage="+8.2%"
	>
		{#snippet icon()}
			<DollarSign class="size-4 text-gray-300" />
		{/snippet}
		{$_('common.vs_last_month')}
	</StatCard>
	<StatCard title={$_('finances.expenses.categories')} value={store.budgets.length.toString()}>
		{#snippet icon()}
			<Target class="size-4 text-gray-300" />
		{/snippet}
		{$_('finances.budget.total_categories')}
	</StatCard>
	<StatCard title={$_('finances.budget.over_budget')} value={store.budgets.length.toString()}>
		{#snippet icon()}
			<AlertTriangle class="size-4 text-gray-300" />
		{/snippet}{$_('finances.budget.need_adjustment')}
	</StatCard>
	<SectionCard
		title={$_('finances.expenses.expenses_by_category')}
		subtitle={$_('finances.expenses.category_desc')}
		colSpan="lg:col-span-3"
	>
		<div class="flex flex-col gap-4">
			{#each store.budgets as category}
				<BudgetCard {category} />
			{/each}
		</div>
	</SectionCard>
</div>
