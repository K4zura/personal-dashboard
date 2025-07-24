<script lang="ts">
	import { _ } from 'svelte-i18n';

	interface Props {
		totalBudget?: number;
		totalSpent?: number;
	}
	let { totalBudget = 10, totalSpent = 5 }: Props = $props();

	let percentage = (totalSpent / totalBudget) * 100;
</script>

<div class="space-y-2">
	<div class="bg-border h-4 overflow-hidden rounded-full">
		<div class="bg-accent h-full transition-all duration-300" style={`width: ${percentage}%`}></div>
	</div>
	<p class="text-xs text-gray-300">{percentage.toFixed(1)}% {$_('common.used').toLowerCase()}</p>
</div>
