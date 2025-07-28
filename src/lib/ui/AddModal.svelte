<script lang="ts">
	import { Field } from '$lib/ui';
	import { Select } from '$lib/ui';
	import { modalIncomeOpen } from '$lib/shared/stores/interactions';
	import { X } from 'lucide-svelte';

	interface Props {
		title: string;
		action: string;
		fields: [title: string, type: string, span: string, forType?: string][];
		values?: string[];
	}
	let { title, action, fields, values }: Props = $props();
	let color = $state('');
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="bg-overlay absolute inset-0 z-50 h-full w-full {$modalIncomeOpen
		? 'flex'
		: 'hidden'} items-center justify-center"
	role="dialog"
	aria-modal="true"
	tabindex="0"
	onclick={(e) => {
		if (e.target === e.currentTarget) {
			$modalIncomeOpen = false;
		}
	}}
>
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<article class="bg-surface border-tertiary relative h-max w-96 rounded border-2 p-4">
		<button
			class="shadow-border hover:bg-border absolute top-2 right-2 cursor-pointer rounded p-1 shadow"
			onclick={() => ($modalIncomeOpen = false)}
		>
			<X class="size-4 stroke-3" />
		</button>
		<h1 class="text-light mb-4 text-xl font-bold">Add New {title}</h1>
		<form action="{action}/add" method="POST" class="grid grid-cols-2 gap-4">
			{#each fields as field}
				{#if field[1] === 'select'}
					<label for={field[0]} class="flex flex-col gap-2 {field[2]}">
						<p class="border-secondary border-l-2 px-1 text-xs font-semibold">{field[0]}</p>

						<Select id={field[0]} span={field[2]} forType={field[3]} {values} />
					</label>
				{:else if field[1] === 'color'}
					<div class="col-span-2 flex items-end gap-2">
						<label for={field[0]} class="relative flex w-full flex-col gap-2 {field[2]}">
							<p class="border-secondary border-l-2 px-1 text-xs font-semibold">{field[0]}</p>

							<input
								bind:value={color}
								type="text"
								name={field[0]}
								id={field[0]}
								class="bg-border shadow-hover w-full border-none shadow ring-0"
								placeholder={field[0].toLowerCase()}
							/>
							<input
								type={field[1]}
								bind:value={color}
								class="absolute right-2 bottom-2 cursor-pointer border-none shadow ring-0"
							/>
						</label>
					</div>
				{:else}
					<Field id={field[0]} type={field[1]} span={field[2]} />
				{/if}
			{/each}
			<button class="bg-primary col-end-3 cursor-pointer rounded px-3 py-1.5">Send</button>
		</form>
	</article>
</div>
