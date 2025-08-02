<script lang="ts">
	import { formatCurrency, formatPercent } from '$lib/shared/utils/format';
	import { _ } from 'svelte-i18n';

	interface Props {
		totalBudget?: number;
		totalSpent?: number;
		type?: string | null;
		size?: number;
		color?: string;
		remaining?: number;
	}
	let {
		totalBudget = 0,
		totalSpent = 0,
		type = null,
		size = 4,
		color = 'var(--color-accent)',
		remaining = -1
	}: Props = $props();

	const percentage = $derived(() => {
		if (!totalBudget || totalBudget === 0) return 0;
		const raw = (totalSpent / totalBudget) * 100;
		return Math.min(Math.max(raw, 0), 100);
	});
</script>

<div class="space-y-2">
	<div
		class={`bg-border h-${size} overflow-hidden rounded-full`}
		role="progressbar"
		aria-valuenow={percentage()}
		aria-valuemin="0"
		aria-valuemax="100"
	>
		<div
			class="h-full transition-all duration-300"
			style={`width: ${percentage()}%; background-color: ${color}`}
		></div>
	</div>
	<div class="text-text-secondary flex items-center justify-between text-xs">
		{#if type === null}
			<p>
				{formatPercent(percentage())}
				{$_('common.used').toLowerCase()}
			</p>
		{/if}
		{#if remaining !== -1}
			<p>
				{$_('common.remaining').toLowerCase()}: {formatCurrency(remaining)}
			</p>
		{/if}
	</div>
</div>
