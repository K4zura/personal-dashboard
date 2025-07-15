<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import SectionCard from '$lib/components/shared/SectionCard.svelte';
	import StatCard from '$lib/components/shared/StatCard.svelte';
	import type { Income } from '$lib/utils/data.js';
	import { DollarSign, Tag, TrendingUp, Wallet } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';

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
			const amount = item.mount;

			// Calcular los totales directamente
			totalAmount += amount;
			if (item.type === 'Fixed') totalFixedAmount += amount;
			if (item.type === 'Variable') totalVariableAmount += amount;

			const key = `${year}-${month}`;

			if (!grouped[key]) {
				grouped[key] = { year, month };
			}

			// Acumulamos los montos por categoría
			grouped[key][category] = (Number(grouped[key][category]) || 0) + amount;
		}

		return Object.values(grouped);
	}

	const monthNames = [...$_('calendar.months')];
	const chartData = transformIncomeData(incomeList, monthNames);

	const submitIncome = async () => {
		const { error } = await data.supabase.from('income').insert({
			name: 'prueba',
			category: 'categoria',
			type: 'tipo',
			date: '2025-07-17',
			mount: 150,
			color: '#ff477f',
			userId: data.user?.id
		});
		console.log(error);
	};
</script>

<h1>{$_('title')}</h1>
<h1 class="text-primary text-xl font-bold">{$_('finances.income.title')}</h1>
<div class="grid grid-cols-1 gap-4 space-y-1 sm:grid-cols-2 xl:grid-cols-4">
	<StatCard
		title={$_('common.total')}
		value={`$${new Intl.NumberFormat('es-CO').format(totalAmount)}`}
		percentage="+8.2%"
	>
		{#snippet icon()}
			<TrendingUp class="size-4 text-gray-300" />
		{/snippet}
		{$_('common.vs_last_month')}
	</StatCard>
	<StatCard
		title={$_('finances.income.fixed')}
		value={`$${new Intl.NumberFormat('es-CO').format(totalFixedAmount)}`}
	>
		{#snippet icon()}
			<DollarSign class="size-4 text-gray-300" />
		{/snippet}
		{$_('finances.income.regular_income')}
	</StatCard>
	<StatCard
		title={$_('finances.income.variable')}
		value={`$${new Intl.NumberFormat('es-CO').format(totalVariableAmount)}`}
	>
		{#snippet icon()}
			<Wallet class="size-4 text-gray-300" />
		{/snippet}
		{$_('finances.income.irregular_income')}
	</StatCard>
	<StatCard title={$_('finances.income.active')} value="4">
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
				onclick={submitIncome}
			>
				<!-- <FilterIcon class="size-4" /> -->
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
					{#each incomeList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as income}
						<tr class="">
							<th scope="row" class="px-6 py-4 whitespace-nowrap">
								{income.name}
							</th>
							<td class="flex items-center gap-2 px-6 py-4">
								<span class={`h-4 w-4 rounded-full bg-[${income.color}]`}></span>
								<!-- {income.category.icon} -->
								{income.category}
							</td>
							<td class="px-6 py-4">
								<span class="bg-tertiary text-surface rounded-full px-3 py-1.5 font-medium"
									>{income.type === 'Fixed' ? $_('types.fixed') : $_('types.variable')}</span
								>
							</td>
							<td class="px-6 py-4">{income.date}</td>
							<td class="text-success px-6 py-4 font-bold">
								+ ${income.mount.toLocaleString()}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</SectionCard>
</div>
