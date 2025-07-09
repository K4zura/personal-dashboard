<script lang="ts">
	import { InfoIcon, UserIcon } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		side: string;
		post: string;
		children: Snippet;
		fields: Snippet;
	}

	const { side, post, children, fields }: Props = $props();
</script>

<section
	class={`bg-light absolute flex ${side}-0 h-[614px] w-[460px] flex-col justify-center rounded-xl px-10`}
	transition:slide
>
	<h1 class="text-dark mb-12 flex items-center justify-center text-5xl font-extrabold">
		<InfoIcon class="size-16 stroke-3" />
		{@render children()}
	</h1>
	<form action={post} method="post" class="flex flex-col justify-center gap-5">
		{@render fields()}

		<button
			type="submit"
			class="bg-secondary text-light cursor-pointer self-end rounded-md px-8 py-1.5 text-lg font-bold"
			>START</button
		>
	</form>
	<div class="text-dark relative mt-10 flex items-center justify-center text-lg font-bold">
		<div
			class="bg-dark after:bg-dark absolute left-0 h-1 w-5/12 after:absolute after:-top-1.5 after:-left-3 after:h-4 after:w-4 after:rounded-full"
		></div>
		<p>O</p>
		<div
			class="bg-dark after:bg-dark absolute right-0 h-1 w-5/12 after:absolute after:-top-1.5 after:-right-3 after:h-4 after:w-4 after:rounded-full"
		></div>
	</div>

	<div class="mt-2 flex justify-evenly">
		<button id="google" class="bg-dark size-16 cursor-pointer rounded-full p-2.5">
			<!-- <GoogleIcon class="size-full" /> -->
			G
		</button>
		<a href={`/dashboard`} class="bg-dark size-16 cursor-pointer rounded-full p-2.5">
			<UserIcon class="text-light pointer-events-none size-full" />
		</a>
	</div>
</section>
