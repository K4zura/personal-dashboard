<script lang="ts">
	import { SavingCard, store } from '$lib/features/finance';
	import { modalIncomeOpen } from '$lib/shared/stores/interactions.js';
	import { formatCurrency } from '$lib/shared/utils/format.js';
	import { AddModal, ProgressBar, SectionCard, StatCard } from '$lib/ui';
	import { CalendarIcon, PiggyBank, Target, TrendingUp } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';

	const t = _;
	const { data } = $props();
	const { goals } = $derived(data);

	$effect(() => {
		store.goals = goals;
	});
	const totalBudget = $derived(() => {
		return store.goals.reduce((acc, goal) => acc + goal.saved, 0);
	});

	const totalSaving = $derived(() => {
		return store.goals.reduce((acc, goal) => acc + goal.total, 0);
	});

	const monthlySaving = $derived(() => {
		return store.goals.reduce((acc, goal) => acc + goal.monthly, 0);
	});
</script>

<svelte:head>
	<title>Dashboard | {$_('finances.savings.title')}</title>
</svelte:head>

<AddModal
	title="Goal"
	action="savings"
	fields={[
		['name', 'text', 'col-span-2'],
		['total', 'number', 'col-span-2'],
		['monthly', 'number', 'col-span-1'],
		['deadline', 'date', 'col-span-1'],
		['color', 'color', 'col-span-2']
	]}
/>

<div class="flex items-center justify-between">
	<h1 class="text-primary text-xl font-bold">{$_('finances.savings.title')}</h1>
	<button
		class="bg-primary cursor-pointer rounded px-3 py-1.5 text-sm"
		onclick={() => ($modalIncomeOpen = true)}
		>{$_('finances.savings.add')}
	</button>
</div>

<div class="grid grid-cols-1 gap-4 space-y-1 sm:grid-cols-2 xl:grid-cols-4">
	<StatCard
		title={$t('finances.savings.total_saved')}
		value={formatCurrency(totalBudget())}
		percentage="+8.2%"
	>
		{#snippet icon()}
			<PiggyBank class="size-4 text-gray-300" />
		{/snippet}
		{$t('common.vs_last_month')}
	</StatCard>

	<StatCard title={$t('finances.savings.total_goal')} value={formatCurrency(totalSaving())}>
		{#snippet icon()}
			<Target class="size-4 text-gray-300" />
		{/snippet}
		<ProgressBar totalBudget={totalSaving()} totalSpent={totalBudget()} />
	</StatCard>

	<StatCard title={$t('finances.savings.monthly_savings')} value={formatCurrency(monthlySaving())}>
		{#snippet icon()}
			<TrendingUp class="size-4 text-gray-300" />
		{/snippet}
		{$t('finances.savings.sum_all_goals')}
	</StatCard>

	<StatCard title={$t('finances.savings.active')} value={store.goals.length.toString()}>
		{#snippet icon()}
			<CalendarIcon class="size-4 text-gray-300" />
		{/snippet}
		0 {$t('common.completed').toLowerCase()}
	</StatCard>

	<SectionCard
		title="Ahorros Agregados"
		subtitle="Seccion de ahorros en proceso"
		colSpan="sm:col-span-2 xl:col-span-4"
	>
		<div class="grid grid-cols-2 gap-4">
			{#each store.goals as goal (goal.id)}
				<SavingCard {goal} />
			{/each}
		</div>
	</SectionCard>
</div>
