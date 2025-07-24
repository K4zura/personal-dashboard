<script lang="ts">
	import { formatCurrency, formatPercent } from '$lib/utils/format';
	import { Edit, Trash } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';
	import { slide } from 'svelte/transition';

	const { categories } = $props();

	let expandedIndex: number | null = $state(null);
</script>

<div class="flex w-full flex-col gap-4">
	{#each categories as { category, spent, limit, color, expenseList }, index}
		{@const percentage = (spent / limit) * 100}
		{@const remaining = limit - spent}
		<article class=" bg-dark rounded-xl shadow-sm select-none">
			<header
				role="button"
				tabindex="0"
				aria-expanded={expandedIndex === index}
				class="cursor-pointer p-4"
				onclick={() => (expandedIndex = expandedIndex === index ? null : index)}
				onkeydown={(e) =>
					e.key === 'Enter' && (expandedIndex = expandedIndex === index ? null : index)}
			>
				<div class="mb-1 flex items-center justify-between">
					<div class="flex items-center gap-2">
						<span class="h-4 w-4 rounded-full" style="background-color: {color}"></span>
						<span class="font-medium">{category}</span>
					</div>
					<span class="text-sm font-semibold"
						>{formatCurrency(spent)} / {formatCurrency(limit)}</span
					>
				</div>
				<div
					class="bg-border mb-1 h-3 overflow-hidden rounded-full"
					role="progressbar"
					aria-valuenow={Number(percentage)}
					aria-valuemin="0"
					aria-valuemax="100"
				>
					<div
						class="h-full transition-all duration-300"
						style={`width: ${percentage}%; background-color: ${color}`}
					></div>
				</div>
				<footer class="flex items-center justify-between text-xs text-gray-500">
					<p>
						{formatPercent(percentage)}
						{$_('common.used').toLowerCase()}
					</p>
					<p>
						{$_('common.remaining').toLowerCase()}: {formatCurrency(remaining)}
					</p>
				</footer>
			</header>
			{#if expandedIndex === index}
				<section class="text-light px-8 pb-6 text-sm transition-all" transition:slide>
					<h2 class="text-lg font-bold">{$_('finances.expenses.expense_details')}</h2>
					<ul class="mt-1 grid grid-cols-2 gap-3">
						{#each expenseList as { name, date, amount, type }}
							{@const usedPercent = (amount / spent) * 100}
							<li
								class="bg-surface shadow-accent group flex flex-col gap-1 rounded p-4 shadow not-md:col-span-2"
							>
								<div role="group" class="flex items-center justify-between">
									<div class="flex items-center gap-3">
										<span class="h-3 w-3 rounded-full" style="background-color: {color}"></span>
										<div class="flex flex-col items-start">
											<h3 class="text-base font-semibold">{name}</h3>
											<span class="bg-accent text-surface rounded-full px-3 py-1 font-semibold">
												<!-- {type.slice(0, 3)} -->
												{#if type.endsWith('ocasional')}
													{$_('types.occasional')}
												{:else if type.endsWith('daily')}
													{$_('types.daily')}
												{:else}
													{$_('types.monthly')}
												{/if}
											</span>
										</div>
									</div>
									<div class="touch-or-hover items-center justify-end gap-1">
										<button
											aria-label="edit"
											class="hover:bg-border cursor-pointer rounded-lg p-2 text-blue-500"
										>
											<Edit class="size-4" />
										</button>
										<button
											aria-label="delete"
											class="text-error hover:bg-border cursor-pointer rounded-lg p-2"
										>
											<Trash class="size-4" />
										</button>
									</div>
								</div>
								<div class="flex w-full items-center justify-between gap-2">
									<p class="text-xl font-semibold">{formatCurrency(amount)}</p>
									<p>
										{new Date(date).toLocaleDateString('en-US', {
											day: 'numeric',
											month: 'long',
											year: 'numeric'
										})}
									</p>
								</div>
								<div
									class="bg-border h-2 w-full rounded-full"
									role="progressbar"
									aria-valuenow={Number(percentage)}
									aria-valuemin="0"
									aria-valuemax="100"
								>
									<div
										class="h-full rounded-full"
										style="width:{usedPercent.toFixed(1)}%; background-color: {color};"
									></div>
								</div>
								<span class="text-muted flex flex-col items-start text-xs">
									{formatPercent(usedPercent)}
									{$_('common.oftotal')}
								</span>
							</li>
						{/each}
					</ul>
				</section>
			{/if}
		</article>
	{/each}
</div>
