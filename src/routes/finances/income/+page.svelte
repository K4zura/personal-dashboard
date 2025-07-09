<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import SectionCard from '$lib/components/shared/SectionCard.svelte';
	import StatCard from '$lib/components/shared/StatCard.svelte';
	import { incomeData, type Income } from '$lib/utils/data';
	import { _ } from 'svelte-i18n';

	let totalAmount = 0;
	let totalFixedAmount = 0;
	let totalVariableAmount = 0;

	interface DataItem {
		year: number;
		month: string;
		[key: string]: number | string;
	}

	function transformIncomeData(data: Income[], monthNames: string[]) {
		const grouped: Record<string, DataItem> = {};

		for (const item of data) {
			const month = monthNames[item.date.getMonth()];
			const year = item.date.getFullYear();
			const category = item.title;
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
	const chartData = transformIncomeData(incomeData, monthNames);
</script>

<h1>{$_('title')}</h1>
<h1 class="text-primary text-xl font-bold">{$_('finances.income.title')}</h1>
<div class="grid grid-cols-1 gap-4 space-y-1 sm:grid-cols-2 xl:grid-cols-4">
	<StatCard title={$_('common.total')} value={`$${totalAmount}`} percentage="+8.2%"
		>{$_('common.vs_last_month')}</StatCard
	>
	<StatCard title={$_('finances.income.fixed')} value={`$${totalFixedAmount}`}
		>{$_('finances.income.regular_income')}</StatCard
	>
	<StatCard title={$_('finances.income.variable')} value={`$${totalVariableAmount}`}
		>{$_('finances.income.irregular_income')}</StatCard
	>
	<StatCard title={$_('finances.income.active')} value="4"
		>{$_('finances.income.different_categories')}</StatCard
	>
	<SectionCard
		title={$_('finances.income.income_chart')}
		subtitle={$_('finances.income.chart_desc')}
		colSpan="sm:col-span-2 xl:col-span-4"
	>
		{#snippet filter()}{/snippet}
		<Chart data={chartData} />
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
					{#each incomeData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as income}
						<tr class="">
							<th scope="row" class="px-6 py-4 whitespace-nowrap">
								{income.title}
							</th>
							<td class="flex items-center gap-2 px-6 py-4">
								<span class={`h-4 w-4 rounded-full bg-${income.category.color}-500`}></span>
								{income.category.icon}
								{income.category.name}
							</td>
							<td class="px-6 py-4">
								<span class="bg-tertiary text-surface rounded-full px-3 py-1.5 font-medium"
									>{income.type === 'Fixed' ? $_('types.fixed') : $_('types.variable')}</span
								>
							</td>
							<td class="px-6 py-4">{income.date.toLocaleDateString()}</td>
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
