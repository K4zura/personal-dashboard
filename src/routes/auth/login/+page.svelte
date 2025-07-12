<script lang="ts">
	import Google from '$lib/components/icons/Google.svelte';
	import Field from '$lib/components/auth/Field.svelte';
	import { Chrome, Github, User, UserIcon } from 'lucide-svelte';

	// Ensure the TypeScript configuration includes the paths for Svelte components
	// If you encounter issues, consider adjusting your tsconfig.json accordingly
</script>

<!-- <InfoCard side="left" /> -->
<!-- <FormCard side="right" post="/api/auth/signin">
	LOGIN
	{#snippet fields()}
		<Field id="email" type="email">E-mail</Field>
		<Field id="password" type="password">Password</Field>
		<a
			href="/"
			class="text-dark hover:drop-shadow-primary -translate-y-1 px-2 text-xs font-bold drop-shadow-md drop-shadow-transparent lg:-translate-y-3"
			>Forgot the password?</a
		>
	{/snippet}
</FormCard> -->

<div
	class="border-primary bg-border my-4 mb-7 flex size-20 rotate-45 items-center justify-center border-4"
>
	<User class="text-primary size-8 -rotate-45" />
</div>
<h1 class="text-3xl font-bold">ACCESS_PORTAL</h1>
<p class="my-2 mb-6 text-xs">ENTER_CREDENTIALS</p>
<Field type="text" id="username">Username</Field>
<Field type="password" id="password">Password</Field>
<a
	href="/"
	class="text-light hover:drop-shadow-primary -translate-y-1 self-end px-2 text-sm font-semibold drop-shadow-md drop-shadow-transparent lg:-translate-y-1"
	>Forgot the password?</a
>

<button
	class="bg-primary group relative my-3 w-full cursor-pointer overflow-hidden rounded py-2 font-bold"
>
	<p class="text-light relative z-10">START</p>
	<div
		class="bg-accent absolute inset-0 h-full w-0 transition-all duration-300 group-hover:w-full"
	></div>
</button>

<div class="my-1 flex w-full items-center">
	<div class="to-secondary h-0.5 flex-1 bg-gradient-to-r from-transparent"></div>
	<span class="px-4 text-xs">ALTERNATIVE_ACCESS_METHODS</span>
	<div class="from-secondary h-0.5 flex-1 bg-gradient-to-r to-transparent"></div>
</div>

<div class="flex w-full gap-2">
	<a
		href="/auth/login/google"
		class="group bg-border text-warning shadow-warning relative my-1.5 flex flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded py-1.5 font-bold hover:shadow-[0_0_2px_2px]"
	>
		<!-- <div
			class="bg-accent absolute inset-0 h-full w-0 transition-all duration-300 group-hover:w-full"
		></div> -->
		<!-- <Google classes="relative pointer-events-none size-6" /> -->
		<Chrome class="pointer-events-none relative size-6" />
		<!-- <p class="relative">Google</p> -->
	</a>
	<a
		href="/auth/login/google"
		class="group bg-border text-light shadow-light relative my-1.5 flex flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded py-1.5 font-bold hover:shadow-[0_0_2px_2px]"
	>
		<!-- <div
			class="bg-accent absolute inset-0 h-full w-0 transition-all duration-300 group-hover:w-full"
		></div> -->
		<!-- <Google classes="relative pointer-events-none size-6" /> -->
		<Github class="pointer-events-none relative size-6" />
		<!-- <p class="relative">Google</p> -->
	</a>
	<a
		href="/dashboard"
		class="group bg-border text-success shadow-success relative my-1.5 flex flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded py-1.5 font-bold hover:shadow-[0_0_2px_2px]"
	>
		<!-- <div
			class="bg-accent absolute inset-0 h-full w-0 transition-all duration-300 group-hover:w-full"
		></div> -->
		<UserIcon class="pointer-events-none relative size-6" />
		<!-- <p class="relative">Guest</p> -->
	</a>
</div>

<!-- <div
class="bg-secondary after:bg-secondary before:bg-secondary relative my-4 h-1 w-full before:absolute before:-top-1.5 before:-right-3 before:h-4 before:w-4 before:rounded-full after:absolute after:-top-1.5 after:-left-3 after:h-4 after:w-4 after:rounded-full"
></div> -->

<div class="my-3 mt-4 flex w-full items-center">
	<div class="via-secondary h-0.5 flex-1 bg-gradient-to-r from-transparent to-transparent"></div>
</div>

<p class="text-sm">NEW_USER?</p>
<a href="/auth/register" class="text-sm font-semibold text-primary hover:drop-shadow-secondary drop-shadow-sm drop-shadow-transparent">REGISTER_NOW</a>