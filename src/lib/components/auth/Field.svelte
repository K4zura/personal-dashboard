<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		type: string;
		id: string;
		children: Snippet;
	}

	const { type, id, children }: Props = $props();
</script>

<label class="relative flex cursor-pointer items-center text-lg font-semibold" for={id}>
	<input
		class="bg-dark caret-primary peer h-12 w-full cursor-pointer rounded-[8px] px-4 tracking-wide outline-none"
		{type}
		name={id}
		{id}
		placeholder=""
	/>
	<span
		class="text-light/75 peer-focus:text-dark not-peer-placeholder-shown:text-dark absolute left-4 transition-all not-peer-placeholder-shown:-translate-x-3 not-peer-placeholder-shown:-translate-y-8 not-peer-placeholder-shown:text-sm peer-focus:-translate-x-3 peer-focus:-translate-y-8 peer-focus:text-sm"
	>
		{@render children()}
	</span>
</label>
