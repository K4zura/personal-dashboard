<script lang="ts">
	import CategoryCard from '$lib/components/finance/CategoryCard.svelte';
	import SectionCard from '$lib/components/shared/SectionCard.svelte';
	import StatCard from '$lib/components/shared/StatCard.svelte';
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
		const spent = gastos.reduce((acc, g) => acc + g.mount, 0);

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

<h1>{$_('title')}</h1>

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
		<div class="relative overflow-x-auto">
			<table class="text-light w-full text-left text-sm rtl:text-right">
				<thead class="bg-border text-tertiary uppercase">
					<tr>
						<th scope="col" class="px-6 py-3">{$_('common.concept')}</th>
						<th scope="col" class="px-6 py-3">{$_('common.category')}</th>
						<th scope="col" class="px-6 py-3">{$_('common.type')}</th>
						<th scope="col" class="px-6 py-3">{$_('common.date')}</th>
						<th scope="col" class="px-6 py-3">{$_('common.amount')}</th>
					</tr>
				</thead>
				<tbody class="font-light">
					{#each expenseData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as expense}
						<tr class="">
							<th scope="row" class="px-6 py-4 whitespace-nowrap">
								{expense.title}
							</th>
							<td class="flex items-center gap-2 px-6 py-4">
								<span class={`h-4 w-4 rounded-full bg-${expense.category.color}-500`}></span>
								{expense.category.icon}
								{expense.category.name}
							</td>
							<td class="px-6 py-4">
								<span class="bg-disabled rounded-full px-2 py-1.5">
									{expense.frequency.slice(0, 3)}

									{#if expense.frequency.endsWith('Ocasional')}
										{$_('types.occasional')}
									{:else if expense.frequency.endsWith('Diario')}
										{$_('types.daily')}
									{:else}
										{$_('types.monthly')}
									{/if}
								</span>
							</td>
							<td class="px-6 py-4">{expense.date.toLocaleDateString()}</td>
							<td class="text-error px-6 py-4 font-bold">
								- ${expense.mount.toLocaleString()}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</SectionCard>
</div>
