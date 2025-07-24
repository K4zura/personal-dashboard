<script lang="ts">
	import { format } from 'date-fns';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import * as db from '$lib/api/db';

	const { goal } = $props();

	let percent = $state(0);
	let remaining = $state(0);
	let monthsLeft = $state(0);
	let daysLeft = $state(0);
	let deadlinePassed = $state(false);
	let isCompleted = $state(false);

	const updateStats = () => {
		percent = (goal.saved / goal.total) * 100;
		remaining = goal.total - goal.saved;
		monthsLeft = Math.ceil(remaining / goal.monthly);
		isCompleted = goal.saved >= goal.total;

		const today = new Date();
		const deadline = new Date(goal.deadline);
		const msLeft = deadline.getTime() - today.getTime();
		daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
		deadlinePassed = msLeft < 0;
	};

	const addSavings = async () => {
		if (goal.saved + goal.monthly > goal.total) {
			goal.monthly = goal.total - goal.saved;
		}
		if (!isNaN(goal.monthly) && goal.monthly >= 0) {
			goal.saved += goal.monthly;
			updateStats();
		}
		await db.saving.addSaved(goal.saved);
	};

	onMount(updateStats);
</script>

<article class="shadow-muted flex flex-col gap-0.5 rounded px-4 py-3 shadow-[0_1px_8px_1px]">
	<h1 class="text-xl font-semibold">{goal.name}</h1>
	{#if isCompleted}
		<div class="absolute inset-0 z-20 flex items-center justify-center rounded backdrop-blur">
			<div class="relative animate-bounce px-6 py-4 text-center">
				<h3 class="text-success text-3xl font-extrabold drop-shadow-md">
					¡{$_('finances.savings.goal')} ({goal.name}) {$_('common.completed')}! 🎉
				</h3>
				<p class="mt-2 text-base text-white/90">{$_('finances.savings.goal_completed')}</p>
			</div>
		</div>
	{/if}
	<div class="text-accent flex justify-between text-sm font-bold">
		<span>{$_('common.progress')}</span>
		<span>{percent.toFixed(1)}%</span>
	</div>
	<div class="bg-border h-3 w-full overflow-x-hidden rounded">
		<div
			class="h-full rounded transition-all duration-500"
			style="width: {percent}%; background-color: {goal.color};"
		></div>
	</div>
	<div class="mt-1 flex justify-between text-xs text-gray-300">
		<p>{goal.saved.toLocaleString()}</p>
		<p>{goal.total.toLocaleString()}</p>
	</div>
	<div class="mt-3 grid grid-cols-2 grid-rows-2 gap-2">
		<div>
			<p class="text-accent text-sm font-semibold">{$_('finances.savings.missing')}</p>
			<p class="text-error font-bold">${remaining.toLocaleString()}</p>
		</div>
		<div>
			<p class="text-accent text-sm font-semibold">{$_('finances.savings.monthly_savings')}</p>
			<p class="text-success font-bold">${goal.monthly.toLocaleString()}</p>
		</div>
		<div>
			<p class="text-accent text-sm font-semibold">{$_('finances.savings.remaining_months')}</p>
			<p class="text-light font-bold">{monthsLeft} {$_('calendar.month2').toLowerCase()}</p>
		</div>
		<div>
			<p class="text-accent text-sm font-semibold">{$_('finances.savings.days_until_deadline')}</p>
			{#if deadlinePassed}
				<p class="text-error font-bold">{$_('common.expired')}</p>
			{:else}
				<p class="text-success font-bold">{daysLeft} {$_('calendar.days').toLowerCase()}</p>
			{/if}
		</div>
	</div>
	<div class="border-border mt-2 flex justify-between border-t py-1.5 text-sm">
		<p class="text-accent font-bold">{$_('common.deadline')}:</p>
		<p class=" text-light font-semibold">{format(new Date(goal.deadline), 'MM/dd/yyyy')}</p>
	</div>
	<div class="flex gap-2">
		<button
			onclick={addSavings}
			class="bg-accent hover:bg-accent/80 text-surface flex-1 cursor-pointer rounded p-2 font-bold"
		>
			{$_('finances.savings.add_goal')}
		</button>
		<button
			class="bg-tertiary hover:bg-secondary text-surface cursor-pointer rounded px-3 font-semibold"
		>
			{$_('common.edit')}
		</button>
	</div>
</article>
