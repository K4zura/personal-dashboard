<script lang="ts">
	import Field from '$lib/components/ui/Field.svelte';

	interface Props {
		title: string;
		action: string;
		fields: [title: string, type: string, span: string][];
	}
	const { title, action, fields }: Props = $props();
</script>

<div class="bg-overlay absolute inset-0 z-50 flex h-full w-full items-center justify-center">
	<article class="bg-surface h-[500px] w-96 rounded p-4">
		<h1>Add New {title}</h1>
		<form action="{action}/add" method="POST" class="grid grid-cols-2 gap-2">
			{#each fields as field}
				{#if field[1] === 'select'}
					<select
						id={field[0]}
						name={field[0]}
						value="fixed"
						class="col-span-{field[2]} bg-border shadow-hover border-none shadow ring-0"
					>
						<option value="fixed">Fixed</option>
						<option value="variable">Variable</option>
					</select>
				{:else}
					<Field id={field[0]} type={field[1]} span={field[2]} />
				{/if}
			{/each}
			<button class="bg-primary cursor-pointer rounded px-3 py-1.5">Send</button>
		</form>
	</article>
</div>
