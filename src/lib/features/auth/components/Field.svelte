<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		type: string;
		id: string;
		children: Snippet;
	}

	const { type, id, children }: Props = $props();
</script>

<label
	class="relative mt-2 flex w-full cursor-text items-center text-xs font-medium sm:text-sm lg:text-base"
	for={id}
>
	<input
		class="border-border caret-text peer h-10 w-full border-2 bg-transparent px-4 text-xs tracking-wide ring-0 outline-none sm:text-sm lg:h-12"
		{type}
		name={id}
		{id}
		placeholder=""
	/>
	<span
		class="text-text-secondary bg-bg-secondary absolute left-4 px-2 transition-all select-none not-peer-placeholder-shown:-translate-x-1 not-peer-placeholder-shown:-translate-y-6 not-peer-placeholder-shown:text-xs peer-focus:-translate-x-1 peer-focus:-translate-y-6 peer-focus:text-xs"
	>
		{@render children()}
	</span>
</label>
