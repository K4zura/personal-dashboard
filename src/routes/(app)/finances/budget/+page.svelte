<script lang="ts">
	import AddModal from '$lib/components/shared/AddModal.svelte';
	import SectionCard from '$lib/components/shared/SectionCard.svelte';
	import StatCard from '$lib/components/shared/StatCard.svelte';
	import { modalIncomeOpen } from '$lib/stores/interactions';
	import { AlertTriangle, DollarSign, Target } from 'lucide-svelte';
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
	// let totalRemaining = $derived(totalBudget - totalSpent);
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
		value="${new Intl.NumberFormat('es-CO').format(totalBudget)}"
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
									${new Intl.NumberFormat('es-CO').format(category.limit)}
								</p>
							</div>
							<div
								class="{category.limit < totalSpent[index]
									? 'text-error'
									: 'text-warning'} flex flex-col items-center"
							>
								<h2 class="text-sm font-medium">{$_('common.used')}</h2>
								<p class="text-lg font-bold sm:text-xl">
									${new Intl.NumberFormat('es-CO').format(totalSpent[index])}
								</p>
							</div>
							<div class="flex items-center justify-end gap-1">
								<button
									aria-label="edit"
									class="text-primary hover:bg-border cursor-pointer rounded-lg p-2"
								>
									<svg
										class="size-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path
											d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
										/></svg
									>
								</button>
								<button
									aria-label="delete"
									class="text-error hover:bg-border cursor-pointer rounded-lg p-2"
								>
									<svg
										class="size-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
											d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
										/><line x1="10" x2="10" y1="11" y2="17" /><line
											x1="14"
											x2="14"
											y1="11"
											y2="17"
										/></svg
									>
								</button>
							</div>
						</div>
					</div>
					<div class="flex w-full items-center gap-2">
						<p class="w-10 text-xs">{totalSpentPercentage[index].toFixed(0)} %</p>
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
