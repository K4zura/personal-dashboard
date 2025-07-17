<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import { _ } from 'svelte-i18n';
	import type Income from '$lib/types/income';

	// Datos y estado
	interface DataItem {
		year: number;
		month: string;
		[key: string]: any;
	}

	interface Props {
		data: DataItem[];
		incomeData: Income[];
	}

	const { data, incomeData }: Props = $props();
	let selectedYear = $state(new Date().getFullYear());
	let selectedMonth = $state($_('calendar.all'));
	let barCanvas: HTMLCanvasElement;
	let chartInstance: Chart<'bar', number[] | any[][], string>;

	// Funciones de procesamiento de datos
	const getCategoryLabels = (data: any[]): string[] => {
		return Array.from(
			new Set(
				data.flatMap((item) => Object.keys(item).filter((k) => k !== 'year' && k !== 'month'))
			)
		);
	};

	const sumCategory = (category: string | number, filteredData: any[]): number => {
		return filteredData.reduce((total, item) => total + (item[category] || 0), 0);
	};

	// Datos filtrados
	const filteredData = $derived(
		data.filter(
			(item) =>
				item.year === selectedYear &&
				(selectedMonth === $_('calendar.all') || item.month === selectedMonth)
		)
	);

	const getCategoryColor = (categoryName: string): string => {
		const category = incomeData.find((cat) => cat.name === categoryName);
		return category ? category.color : '#000000'; // Default color (negro)
	};

	// Labels
	const categoryLabels = $derived(getCategoryLabels(filteredData));

	// Años disponibles
	const availableYears = $derived([...new Set(data.map((item) => item.year))]);

	// Meses disponibles
	const availableMonths = $derived([
		$_('calendar.all'),
		...new Set(data.filter((item) => item.year === selectedYear).map((item) => item.month))
	]);

	// Comprobación de cambios

	$effect(() => {
		if (!availableMonths.includes(selectedMonth)) {
			selectedMonth = $_('calendar.all');
		}
	});

	const datasetColors = $derived(categoryLabels.map((label) => getCategoryColor(label)));
	// Creación del gráfico
	const createChart = () => {
		if (!barCanvas) return;

		const barCtx = barCanvas.getContext('2d');
		if (!barCtx) return;

		chartInstance = new Chart(barCtx, {
			type: 'bar',
			data: {
				labels: categoryLabels,
				datasets: [
					{
						label: '',
						data:
							selectedMonth === $_('calendar.all')
								? categoryLabels.map((label) => sumCategory(label, filteredData))
								: categoryLabels.map((label) => filteredData.map((d) => d[label] || 0)),
						backgroundColor: datasetColors,
						borderRadius: 6,
						borderSkipped: false,
						barPercentage: 0.5,
						maxBarThickness: 150
						// hoverBackgroundColor: 'rgba(0, 0, 0, 0.3)'
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				color: '#efeffe',
				plugins: {
					title: {
						display: false,
						text: 'Ingresos Mensuales',
						font: { size: 18, weight: 'bold' }
					},
					legend: {
						display: false,
						position: 'top',
						labels: {
							usePointStyle: true,
							padding: 20
						}
					}
				},
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							color: '#F3F4F659'
						}
					},
					x: {
						grid: {
							display: false
						}
					}
				}
			}
		});
	};

	// Actualización del gráfico
	const updateChart = () => {
		if (chartInstance) {
			const filteredDatasetData = categoryLabels.map((label) => sumCategory(label, filteredData));
			chartInstance.data.labels = categoryLabels;
			chartInstance.data.datasets[0].data = filteredDatasetData;
			chartInstance.data.datasets[0].backgroundColor = datasetColors;
			chartInstance.update();
		}
	};

	// Montaje y actualización
	onMount(() => {
		Chart.register(...registerables);
		createChart();
	});

	$effect(() => {
		updateChart();
	});
</script>

<div class="mb-4 flex flex-wrap gap-4">
	<div>
		<label class="mb-1 block text-sm font-medium" for="year">{$_('calendar.year')}</label>
		<select
			bind:value={selectedYear}
			id="year"
			class="bg-dark border-border rounded border px-3 py-1 pr-8"
		>
			{#each availableYears as year}
				<option value={year}>{year}</option>
			{/each}
		</select>
	</div>

	<div>
		<label class="mb-1 block text-sm font-medium" for="month">{$_('calendar.month')}</label>
		<select
			bind:value={selectedMonth}
			id="month"
			class="bg-dark border-border rounded border px-3 py-1 pr-8"
		>
			{#each availableMonths as month}
				<option value={month}>{month}</option>
			{/each}
		</select>
	</div>
</div>

<div class="chart-card full-width">
	<canvas
		class="bg-surface shadow-dark min-h-[350px] rounded-xl p-4 shadow-lg"
		bind:this={barCanvas}
	></canvas>
</div>
