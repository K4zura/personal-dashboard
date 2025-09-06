<script lang="ts">
	import type { Expense, Income } from '$lib/features/finance';
	import { formatCurrency } from '$lib/shared/utils/format';
	import { Badge } from '$lib/ui';
	import { _ } from 'svelte-i18n';

	interface Props {
		data: Income[] | Expense[];
		colors?: Record<string, string>;
		category: boolean;
	}

	const { data, colors, category }: Props = $props();
</script>

<div class="relative overflow-x-auto">
	<table class="text-text-secondary w-full text-left text-sm rtl:text-right">
		<thead class="bg-card-bg text-accent uppercase">
			<tr>
				<th scope="col" class="px-6 py-3">{$_('common.concept')}</th>
				{#if category}
					<th scope="col" class="px-6 py-3">{$_('common.category')}</th>
				{/if}
				<th scope="col" class="px-6 py-3">{$_('common.type')}</th>
				<th scope="col" class="px-6 py-3">{$_('common.date')}</th>
				<th scope="col" class="px-6 py-3">{$_('common.amount')}</th>
			</tr>
		</thead>
		<tbody class="font-light">
			{#each data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as row}
				<tr class="">
					<th scope="row" class="px-6 py-4 whitespace-nowrap">
						{row.name}
					</th>
					{#if category && 'category' in row}
						<td class="flex items-center gap-2 px-6 py-4 whitespace-nowrap">
							<span
								class="h-4 w-4 rounded-full"
								style="background-color: {colors?.[row.category as string]}"
							></span>
							{row.category}
						</td>
						<td class="px-6 py-4">
							<Badge
								text={$_('types.' + row.type)}
								color="bg-accent text-bg-secondary font-medium"
								size="text-sm"
							/>
						</td>
					{:else}
						<td class="px-6 py-4">
							<span
								class="bg-secondary text-text rounded-full px-3 py-1.5 font-medium whitespace-nowrap"
								>{row.type === 'fixed' ? $_('types.fixed') : $_('types.variable')}</span
							>
						</td>
					{/if}
					<td class="px-6 py-4">{new Date(row.date).toLocaleDateString('es-CO')}</td>
					{#if category}
						<td class="text-error px-6 py-4 font-bold">
							- {formatCurrency(row.amount)}
						</td>
					{:else}
						<td class="text-success px-6 py-4 font-bold">
							+ {formatCurrency(row.amount)}
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
