<script lang="ts">
	import CategoryCard from '$lib/components/finance/CategoryCard.svelte';
	import SectionCard from '$lib/components/shared/SectionCard.svelte';
	import StatCard from '$lib/components/shared/StatCard.svelte';
	import Table from '$lib/components/shared/Table.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import { expenseCategories, expenseData, type Expense } from '$lib/utils/data';
	import { AlertTriangle, CreditCard, ShoppingCart, TrendingDown } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';

	type Expenses = {
		category: string;
		spent: number;
		budget: number;
		color: string;
		expenseList: Expense[];
	};

	const expenses: Expenses[] = expenseCategories.map((category) => {
		const gastos = expenseData.filter((e) => e.category.name === category.name);
		const spent = gastos.reduce((acc, g) => acc + g.amount, 0);

		return {
			category: category.name,
			spent,
			budget: category.budget ?? 0,
			color: category.color,
			expenseList: gastos
		};
	});

	const totalSpent = $derived(expenses.reduce((acc, e) => acc + e.spent, 0));
	const totalBudget = $derived(expenses.reduce((acc, e) => acc + e.budget, 0));
	const totalSpentPercentage = $derived((totalSpent / totalBudget) * 100);
</script>

<svelte:head>
	<title>Dashboard | {$_('finances.expenses.title')}</title>
</svelte:head>

<h1 class="text-primary text-xl font-bold">{$_('finances.expenses.title')}</h1>

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
	<StatCard title={$_('finances.budget.title')} value="${totalBudget}">
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
		<CategoryCard {expenses} />
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

		<Table data={expenseData} category={true} />
	</SectionCard>
</div>
