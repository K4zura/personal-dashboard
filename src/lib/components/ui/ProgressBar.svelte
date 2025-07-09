<script lang="ts">
	import { _ } from 'svelte-i18n';

	let totalBudget = 1150;
	let totalSpent = 475;

	let percentage = (totalSpent / totalBudget) * 100;
</script>

<div class="space-y-2">
	<div class="bg-border h-4 overflow-hidden rounded-full">
		<div class="bg-accent h-full transition-all duration-300" style={`width: ${percentage}%`}></div>
	</div>
	<p class="text-xs text-gray-300">{percentage.toFixed(1)}% {$_('common.used').toLowerCase()}</p>
</div>
