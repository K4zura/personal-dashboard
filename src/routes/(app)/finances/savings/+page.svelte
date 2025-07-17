<script lang="ts">
	import GoalCard from '$lib/components/finance/GoalCard.svelte';
	import SectionCard from '$lib/components/shared/SectionCard.svelte';
	import StatCard from '$lib/components/shared/StatCard.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import { CalendarIcon, PiggyBank, Target, TrendingUp } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';

	const t = _;

	const goals = [
		{
			title: 'House',
			color: 'red',
			category: 'Housing',
			priority: 'High',
			total: 25000,
			saved: 8500,
			monthly: 800,
			deadline: '2025-11-30'
		},
		{
			title: 'New Motorcycle',
			color: 'purple',
			category: 'Transport',
			priority: 'Low',
			total: 40000000,
			saved: 6000000,
			monthly: 1200000,
			deadline: '2024-12-31'
		},
		{
			title: 'PC Build',
			color: 'blue',
			category: 'Technology',
			priority: 'Medium',
			total: 1900000,
			saved: 1250000,
			monthly: 50000,
			deadline: '2025-12-31'
		}
	];
</script>

<svelte:head>
	<title>Dashboard | {$_('finances.savings.title')}</title>
</svelte:head>

<h1 class="text-primary text-xl font-bold">{$t('finances.savings.title')}</h1>

<!-- <p>{$t('greeting', { values: { name: 'Carlos' } })}</p> -->
<div class="grid grid-cols-1 gap-4 space-y-1 sm:grid-cols-2 xl:grid-cols-4">
	<StatCard title={$t('finances.savings.total_saved')} value="$20000" percentage="+8.2%">
		{#snippet icon()}
			<PiggyBank class="size-4 text-gray-300" />
		{/snippet}
		{$t('common.vs_last_month')}
	</StatCard>
	<StatCard title={$t('finances.savings.total_goal')} value="$45000">
		{#snippet icon()}
			<Target class="size-4 text-gray-300" />
		{/snippet}
		<ProgressBar />
	</StatCard>
	<StatCard title={$t('finances.savings.monthly_savings')} value="$2200">
		{#snippet icon()}
			<TrendingUp class="size-4 text-gray-300" />
		{/snippet}
		{$t('finances.savings.sum_all_goals')}
	</StatCard>
	<StatCard title={$t('finances.savings.active')} value="5">
		{#snippet icon()}
			<CalendarIcon class="size-4 text-gray-300" />
		{/snippet}
		0 {$t('common.completed').toLowerCase()}
	</StatCard>
	{#each goals as goal}
		<SectionCard title={goal.title} subtitle={goal.category} colSpan="sm:col-span-2">
			<GoalCard {goal} />
		</SectionCard>
	{/each}
</div>
