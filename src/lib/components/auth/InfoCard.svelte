<script lang="ts">
	interface Props {
		side: string;
	}

	const { side }: Props = $props();
</script>

<section
	class={`bg-primary absolute flex ${side}-0 h-[532px] w-3/5 max-w-[512px] flex-col justify-evenly rounded-xl px-16 lg:h-[682px]`}
>
	<div class="text-center">
		<h2 class="text-3xl font-extrabold lg:text-6xl">!WELCOME</h2>
		<p class="text-base lg:text-xl">
			Personalize your own dashbord for your finaces, all that you need in a only place
		</p>
	</div>
	<div class="flex flex-col items-center gap-2">
		{#if side === 'left'}
			<p class="text-xl font-bold lg:text-2xl">Don't have account?</p>
			<a href={`/auth/register`} class="bg-dark rounded-md px-20 py-2 text-lg font-bold lg:text-xl">
				Register
			</a>
		{:else}
			<p class="text-2xl font-bold">Do you have account?</p>
			<a href={`/auth/login`} class="bg-dark rounded-md px-20 py-2 text-xl font-bold">Login</a>
		{/if}
	</div>
</section>
