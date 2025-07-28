<script lang="ts">
	import type { Goal } from '$lib/features/finance';
	import { db, store } from '$lib/features/finance';
	import { formatCurrency, formatPercent } from '$lib/shared/utils/format';
	import { format } from 'date-fns';
	import { Edit, Trash } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';

	interface Props {
		goal: Goal;
	}

	const { goal }: Props = $props();
	let localGoal: Goal = $state({ ...goal });
	let daysLeft = $state(0);
	let deadlinePassed = $state(false);
	const id_goal = localGoal.id;

	let percent = $derived((localGoal.saved / localGoal.total) * 100);
	let remaining = $derived(localGoal.total - localGoal.saved);
	let monthsLeft = $derived(Math.ceil(remaining / localGoal.monthly));
	let isCompleted = $derived(localGoal.saved >= localGoal.total);

	const today = new Date();
	const deadline = new Date(localGoal.deadline);
	const msLeft = deadline.getTime() - today.getTime();
	daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
	deadlinePassed = msLeft < 0;

	$effect(() => {
		const msLeft = new Date(localGoal.deadline).getTime() - Date.now();
		daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
		deadlinePassed = msLeft < 0;
	});

	const addSavings = async () => {
		const monthlyToAdd = Math.min(localGoal.monthly, localGoal.total - localGoal.saved);
		if (monthlyToAdd <= 0) return;
		localGoal.saved += monthlyToAdd;

		try {
			await db.saving.addSaved(localGoal.saved, id_goal);
		} catch (e) {
			console.error(e);
		}

		store.goals = store.goals.map((b) => (b.id === id_goal ? localGoal : b));
	};

	const deleteGoal = async () => {
		await db.saving.deleteGoal(id_goal);
		store.goals = store.goals.filter((b) => b.id !== id_goal);
	};
</script>

<article
	class="shadow-muted relative flex flex-col gap-0.5 rounded px-4 py-3 shadow-[0_1px_8px_1px]"
>
	<h1 class="text-xl font-semibold">{localGoal.name}</h1>
	{#if isCompleted}
		<div class="absolute inset-0 z-20 flex items-center justify-center rounded backdrop-blur">
			<div class="relative animate-bounce px-6 py-4 text-center">
				<h3 class="text-success text-3xl font-extrabold drop-shadow-md">
					¡{$_('finances.savings.goal')} ({localGoal.name}) {$_('common.completed')}! 🎉
				</h3>
				<p class="mt-2 text-base text-white/90">{$_('finances.savings.goal_completed')}</p>
			</div>
		</div>
	{/if}

	<div class="text-accent flex justify-between text-sm font-bold">
		<span>{$_('common.progress')}</span>
		<span>{formatPercent(percent)}</span>
	</div>

	<div class="bg-border h-3 w-full overflow-x-hidden rounded">
		<div
			class="h-full rounded transition-all duration-500"
			style={`width: ${percent}%; background-color: ${localGoal.color}`}
		></div>
	</div>

	<div class="mt-1 flex justify-between text-xs text-gray-300">
		<p>{formatCurrency(localGoal.saved)}</p>
		<p>{formatCurrency(localGoal.total)}</p>
	</div>

	<div class="mt-3 grid grid-cols-2 grid-rows-2 gap-2">
		<div>
			<p class="text-accent text-sm font-semibold">{$_('finances.savings.missing')}</p>
			<p class="text-error font-bold">{formatCurrency(remaining)}</p>
		</div>
		<div>
			<p class="text-accent text-sm font-semibold">{$_('finances.savings.monthly_savings')}</p>
			<p class="text-success font-bold">{formatCurrency(localGoal.monthly)}</p>
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
		<p class=" text-light font-semibold">{format(new Date(localGoal.deadline), 'MM/dd/yyyy')}</p>
	</div>

	<div class="flex gap-2">
		<button
			onclick={addSavings}
			class="bg-accent hover:bg-accent/80 text-surface flex-1 cursor-pointer rounded p-2 font-bold"
		>
			{$_('finances.savings.add_goal')}
		</button>
		<div class="flex items-center justify-end gap-1">
			<button aria-label="edit" class="hover:bg-border cursor-pointer rounded-lg p-2 text-blue-500">
				<Edit class="size-4" />
			</button>
			<button
				aria-label="delete"
				class="text-error hover:bg-border cursor-pointer rounded-lg p-2"
				onclick={deleteGoal}
			>
				<Trash class="size-4" />
			</button>
		</div>
	</div>
</article>
