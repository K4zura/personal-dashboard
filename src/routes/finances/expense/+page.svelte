<script lang="ts">
	import CategoryCard from '$lib/components/finance/CategoryCard.svelte';
	import SectionCard from '$lib/components/shared/SectionCard.svelte';
	import StatCard from '$lib/components/shared/StatCard.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import { expenseCategories, expenseData, type Expense } from '$lib/utils/data';
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

	$: totalSpent = expenses.reduce((acc, e) => acc + e.spent, 0);
	$: totalBudget = expenses.reduce((acc, e) => acc + e.budget, 0);
	$: totalSpentPercentage = (totalSpent / totalBudget) * 100;
</script>

<h1>{$_('title')}</h1>

<h1 class="text-primary text-xl font-bold">{$_('finances.expenses.title')}</h1>

<div class="grid grid-cols-1 gap-4 space-y-1 sm:grid-cols-2 xl:grid-cols-4">
	<StatCard
		title={$_('finances.expenses.total')}
		value="${totalSpent}"
		percentage="+{totalSpentPercentage.toFixed(1)}%"
	>
		{$_('finances.expenses.vs_last_month')}
	</StatCard>
	<StatCard title={$_('finances.budget.title')} value="${totalBudget}">
		<ProgressBar />
	</StatCard>
	<StatCard title={$_('finances.expenses.average')} value="$16">
		{$_('finances.expenses.based_on_30')}
	</StatCard>
	<StatCard title={$_('finances.expenses.categories')} value="5">2 over budget</StatCard>
	<SectionCard
		title="Expenses by Category"
		subtitle="Budget Tracking by Category"
		colSpan="sm:col-span-2 xl:col-span-4"
	>
		<CategoryCard {expenses} />
	</SectionCard>
	<SectionCard
		title="Income History"
		subtitle="Detailed list of all your income"
		colSpan="sm:col-span-2 xl:col-span-4"
	>
		<button
			slot="filter"
			class="bg-secondary hover:bg-tertiary text-light flex cursor-pointer gap-2 rounded px-3 py-2 text-sm font-semibold"
		>
			{$_('finances.income.filter')}
		</button>
		<div class="relative overflow-x-auto">
			<table class="text-light w-full text-left text-sm rtl:text-right">
				<thead class="bg-border text-tertiary uppercase">
					<tr>
						<th scope="col" class="px-6 py-3">{$_('finances.income.concept')}</th>
						<th scope="col" class="px-6 py-3">{$_('finances.income.category')}</th>
						<th scope="col" class="px-6 py-3">{$_('finances.income.type')}</th>
						<th scope="col" class="px-6 py-3">{$_('finances.income.date')}</th>
						<th scope="col" class="px-6 py-3">{$_('finances.income.amount')}</th>
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
								<span class="bg-disabled rounded-full px-2 py-1.5">{expense.frequency}</span>
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
