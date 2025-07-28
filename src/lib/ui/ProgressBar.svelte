<script lang="ts">
	import { formatPercent } from '$lib/shared/utils/format';
	import { _ } from 'svelte-i18n';

	interface Props {
		totalBudget?: number;
		totalSpent?: number;
		type?: string;
	}
	let { totalBudget = 0, totalSpent = 0, type }: Props = $props();

	const percentage = $derived(() => {
		if (!totalBudget || totalBudget === 0) return 0;
		const raw = (totalSpent / totalBudget) * 100;
		return Math.min(Math.max(raw, 0), 100);
	});
</script>

<div class="space-y-2">
	<div
		class="bg-border h-4 overflow-hidden rounded-full"
		role="progressbar"
		aria-valuenow={percentage()}
		aria-valuemin="0"
		aria-valuemax="100"
	>
		<div
			class="bg-accent h-full transition-all duration-300"
			style={`width: ${percentage()}%`}
		></div>
	</div>
	{#if type === null}
		<p class="text-xs text-gray-300">
			{formatPercent(percentage())}
			{$_('common.used').toLowerCase()}
		</p>
	{/if}
</div>
