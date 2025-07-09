<script lang="ts">
	interface Props {
		side: string;
	}

	const { side }: Props = $props();
</script>

<section
	class={`bg-primary absolute flex ${side}-0 h-[682px] w-[512px] flex-col justify-evenly rounded-xl px-16`}
>
	<div class="text-center">
		<h2 class="text-6xl font-extrabold">!WELCOME</h2>
		<p class="text-xl">
			Personalize your own dashbord for your finaces, all that you need in a only place
		</p>
	</div>
	<div class="flex flex-col items-center gap-2">
		{#if side === 'left'}
			<p class="text-2xl font-bold">Don't have account?</p>
			<a href={`/auth/register`} class="bg-dark rounded-md px-20 py-2 text-xl font-bold">
				Register
			</a>
		{:else}
			<p class="text-2xl font-bold">Do you have account?</p>
			<a href={`/auth/login`} class="bg-dark rounded-md px-20 py-2 text-xl font-bold">Login</a>
		{/if}
	</div>
</section>
