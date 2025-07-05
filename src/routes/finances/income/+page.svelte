<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
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

	const monthNames = [...$_('months')];
	const chartData = transformIncomeData(incomeData, monthNames);
</script>

<h1>{$_('title')}</h1>
<h1 class="text-primary text-xl font-bold">{$_('finances.income')}</h1>
<Chart data={chartData} />
