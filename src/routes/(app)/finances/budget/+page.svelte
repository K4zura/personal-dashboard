<script lang="ts">
	import AddModal from '$lib/components/shared/AddModal.svelte';
	import SectionCard from '$lib/components/shared/SectionCard.svelte';
	import StatCard from '$lib/components/shared/StatCard.svelte';
	import { modalIncomeOpen } from '$lib/stores/interactions';
	import { formatCurrency, formatPercent } from '$lib/utils/format.js';
	import { AlertTriangle, DollarSign, Edit, Target, Trash } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';

	const { data } = $props();
	const { categories } = $derived(data);
	let totalBudget = $derived(categories.reduce((acc, category) => acc + category.limit, 0));
	let totalSpentPercentage: number[] = [];
	let totalSpent = $derived(
		categories.map((category) => {
			let spent = 0;
			category.expense.map((g: { amount: any }) => (spent += g.amount));
			totalSpentPercentage.push((spent / category.limit) * 100);

			return spent;
		})
	);
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
	<StatCard title={$_('finances.expenses.categories')} value={categories.length.toString()}>
		{#snippet icon()}
			<Target class="size-4 text-gray-300" />
		{/snippet}
		{$_('finances.budget.total_categories')}
	</StatCard>
	<StatCard title={$_('finances.budget.over_budget')} value={categories.length.toString()}>
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
			{#each categories as category, index}
				<article
					class="shadow-tertiary flex flex-col items-center gap-2 rounded px-4 py-3 shadow-[-1px_1px_1px_1px]"
				>
					<div class="flex w-full flex-wrap items-center justify-between gap-2">
						<div class="flex items-center gap-2 self-start">
							<span class="h-4 w-4 rounded-full" style="background-color: {category.color}"></span>
							<h1 class="text-lg font-semibold sm:text-xl">{category.name}</h1>
						</div>

						<div class="ml-auto flex items-center gap-6">
							<div class="text-success flex flex-col items-center">
								<h2 class="text-sm font-medium">{$_('finances.budget.title')}</h2>
								<p class="text-lg font-bold sm:text-xl">
									{formatCurrency(category.limit)}
								</p>
							</div>
							<div
								class="{category.limit < totalSpent[index]
									? 'text-error'
									: 'text-warning'} flex flex-col items-center"
							>
								<h2 class="text-sm font-medium">{$_('common.used')}</h2>
								<p class="text-lg font-bold sm:text-xl">
									{formatCurrency(totalSpent[index])}
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
								>
									<Trash class="size-4" />
								</button>
							</div>
						</div>
					</div>
					<div class="flex w-full items-center gap-2">
						<p class="w-11 text-xs">{formatPercent(totalSpentPercentage[index])}</p>
						<div
							class="bg-border relative mb-1 h-3 w-full overflow-hidden rounded-full"
							role="progressbar"
							aria-valuenow={Number(totalSpentPercentage[index])}
							aria-valuemin="0"
							aria-valuemax="100"
						>
							<div
								class="h-full transition-all duration-300"
								style={`width: ${totalSpentPercentage[index]}%; background-color: ${category.color}`}
							></div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</SectionCard>
</div>
