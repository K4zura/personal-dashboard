<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import { _ } from 'svelte-i18n';

	// Datos y estado
	interface DataItem {
		year: number;
		month: string;
		[key: string]: any;
	}

	export let data: DataItem[];
	let selectedYear = new Date().getFullYear();
	let selectedMonth = $_('chart.all');
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
	$: filteredData = data.filter(
		(item) =>
			item.year === selectedYear &&
			(selectedMonth === $_('chart.all') || item.month === selectedMonth)
	);

	// Labels
	$: categoryLabels = getCategoryLabels(data);

	// Años disponibles
	$: availableYears = [...new Set(data.map((item) => item.year))];

	// Meses disponibles
	$: availableMonths = [
		$_('chart.all'),
		...new Set(data.filter((item) => item.year === selectedYear).map((item) => item.month))
	];

	// Comprobación de cambios
	$: {
		if (!availableMonths.includes(selectedMonth)) {
			selectedMonth = $_('chart.all');
		}
	}

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
						label: 'Q1',
						data:
							selectedMonth === $_('chart.all')
								? categoryLabels.map((label) => sumCategory(label, filteredData))
								: categoryLabels.map((label) => filteredData.map((d) => d[label] || 0)),
						backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
						borderRadius: 6,
						borderSkipped: false
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					title: {
						display: true,
						text: 'Comparación Trimestral por Producto',
						font: { size: 18, weight: 'bold' },
						color: '#1F2937'
					},
					legend: {
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
							color: '#F3F4F6'
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
			chartInstance.data.labels = categoryLabels;
			chartInstance.data.datasets[0].data =
				selectedMonth === $_('chart.all')
					? categoryLabels.map((label) => sumCategory(label, filteredData))
					: categoryLabels.map((label) => filteredData.map((d) => d[label] || 0));
			chartInstance.update();
		}
	};

	// Montaje y actualización
	onMount(() => {
		Chart.register(...registerables);
		createChart();
	});

	afterUpdate(() => {
		updateChart();
	});
</script>

<div class="mb-4 flex flex-wrap gap-4">
	<div>
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label class="mb-1 block text-sm font-medium" for="year">{$_('chart.year')}</label>
		<select
			bind:value={selectedYear}
			id="year"
			class="bg-dark border-border rounded border px-3 py-1"
		>
			{#each availableYears as year}
				<option value={year}>{year}</option>
			{/each}
		</select>
	</div>

	<div>
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label class="mb-1 block text-sm font-medium" for="month">{$_('chart.month')}</label>
		<select
			bind:value={selectedMonth}
			id="month"
			class="bg-dark border-border rounded border px-3 py-1"
		>
			{#each availableMonths as month}
				<option value={month}>{month}</option>
			{/each}
		</select>
	</div>
</div>

<div class="page-container">
	<div class="charts-grid">
		<div class="chart-card full-width">
			<canvas bind:this={barCanvas}></canvas>
		</div>
	</div>
</div>

<style>
	.charts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.chart-card {
		background: var(--color-light);
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		height: 400px;
	}

	.chart-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
	}

	.chart-card.full-width {
		grid-column: 1 / -1;
	}

	canvas {
		width: 100% !important;
		height: 100% !important;
	}

	@media (max-width: 768px) {
		.charts-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.chart-card {
			padding: 1rem;
			height: 350px;
		}
	}
</style>
