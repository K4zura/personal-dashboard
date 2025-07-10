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
	class="relative my-2.5 flex w-full cursor-text items-center text-sm font-medium lg:text-base"
	for={id}
>
	<input
		class="bg-dark caret-light peer shadow-border h-10 w-full rounded border-0 px-4 tracking-wide ring-0 outline-none focus:shadow-[inset_0_0_10px_1px] lg:h-12"
		{type}
		name={id}
		{id}
		placeholder=""
	/>
	<span
		class="text-light/75 absolute left-4 transition-all not-peer-placeholder-shown:-translate-x-3 not-peer-placeholder-shown:-translate-y-8 not-peer-placeholder-shown:text-xs peer-focus:-translate-x-3 peer-focus:-translate-y-8 peer-focus:text-xs"
	>
		{@render children()}
	</span>
</label>
