<script lang="ts">
	import AddModal from '$lib/components/shared/AddModal.svelte';
	import SectionCard from '$lib/components/shared/SectionCard.svelte';
	import StatCard from '$lib/components/shared/StatCard.svelte';
	import Table from '$lib/components/shared/Table.svelte';
	import Chart from '$lib/components/widgets/Chart.svelte';
	import { modalIncomeOpen } from '$lib/stores/interactions.js';
	import type { Income } from '$lib/types/finances.js';
	import { formatCurrency } from '$lib/utils/format.js';
	import { DollarSign, Tag, TrendingUp, Wallet } from 'lucide-svelte';
	import { _, json } from 'svelte-i18n';

	let totalAmount = $state(0);
	let totalFixedAmount = $state(0);
	let totalVariableAmount = $state(0);
	const { data } = $props();
	const { incomeList } = $derived(data);

	interface DataItem {
		year: number;
		month: string;
		[key: string]: number | string;
	}

	function transformIncomeData(data: Income[], monthNames: string[]) {
		const grouped: Record<string, DataItem> = {};

		for (const item of data) {
			let date = new Date(item.date);
			const month = monthNames[date.getMonth()];
			const year = date.getFullYear();
			const category = item.name;
			const amount = item.amount;

			totalAmount += amount;
			if (item.type === 'fixed') totalFixedAmount += amount;
			if (item.type === 'variable') totalVariableAmount += amount;

			const key = `${year}-${month}`;

			if (!grouped[key]) {
				grouped[key] = { year, month };
			}

			grouped[key][category] = (Number(grouped[key][category]) || 0) + amount;
		}

		return Object.values(grouped);
	}

	const monthsNames = $json('calendar.months') as string[];
	// svelte-ignore state_referenced_locally
	const chartData = transformIncomeData(incomeList, monthsNames);
</script>

<svelte:head>
	<title>Dashboard | {$_('finances.income.title')}</title>
</svelte:head>

<AddModal
	title="Income"
	action="income"
	fields={[
		['name', 'text', 'col-span-2'],
		['type', 'select', 'col-span-1'],
		['date', 'date', 'col-span-1'],
		['amount', 'number', 'col-span-2'],
		['color', 'color', 'col-span-2']
	]}
/>
<div class="flex items-center justify-between">
	<h1 class="text-primary text-xl font-bold">{$_('finances.income.title')}</h1>
	<button
		class="bg-primary cursor-pointer rounded px-3 py-1.5 text-sm"
		onclick={() => ($modalIncomeOpen = true)}>{$_('finances.income.add')}</button
	>
</div>
<div class="grid grid-cols-1 gap-4 space-y-1 sm:grid-cols-2 xl:grid-cols-4">
	<StatCard title={$_('common.total')} value={formatCurrency(totalAmount)} percentage="+8.2%">
		{#snippet icon()}
			<TrendingUp class="size-4 text-gray-300" />
		{/snippet}
		{$_('common.vs_last_month')}
	</StatCard>
	<StatCard title={$_('finances.income.fixed')} value={formatCurrency(totalFixedAmount)}>
		{#snippet icon()}
			<DollarSign class="size-4 text-gray-300" />
		{/snippet}
		{$_('finances.income.regular_income')}
	</StatCard>
	<StatCard title={$_('finances.income.variable')} value={formatCurrency(totalVariableAmount)}>
		{#snippet icon()}
			<Wallet class="size-4 text-gray-300" />
		{/snippet}
		{$_('finances.income.irregular_income')}
	</StatCard>
	<StatCard title={$_('finances.income.active')} value={incomeList.length.toString()}>
		{#snippet icon()}
			<Tag class="size-4 text-gray-300" />
		{/snippet}
		{$_('finances.income.different_categories')}
	</StatCard>
	<SectionCard
		title={$_('finances.income.income_chart')}
		subtitle={$_('finances.income.chart_desc')}
		colSpan="sm:col-span-2 xl:col-span-4"
	>
		<Chart data={chartData} incomeData={incomeList} />
	</SectionCard>
	<SectionCard
		title={$_('finances.income.income_history')}
		subtitle={$_('finances.income.history_desc')}
		colSpan="sm:col-span-2 xl:col-span-4"
	>
		{#snippet filter()}
			<button
				class="bg-secondary hover:bg-tertiary text-light flex cursor-pointer gap-2 rounded px-3 py-2 text-sm font-semibold"
			>
				<!-- <FilterIcon class="size-4" /> -->
				{$_('common.filter')}
			</button>
		{/snippet}
		<Table data={incomeList} category={false} />
	</SectionCard>
</div>
