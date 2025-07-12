<script lang="ts">
	import Google from '$lib/components/icons/Google.svelte';
	import Field from '$lib/components/auth/Field.svelte';
	import { User, UserIcon } from 'lucide-svelte';

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
		class="absolute inset-0 h-full w-0 bg-accent transition-all duration-300 group-hover:w-full"
	></div>
</button>

<div
	class="bg-secondary after:bg-secondary before:bg-secondary relative my-4 h-1 w-full before:absolute before:-top-1.5 before:-right-3 before:h-4 before:w-4 before:rounded-full after:absolute after:-top-1.5 after:-left-3 after:h-4 after:w-4 after:rounded-full"
></div>

<a
	href="/auth/login/google"
	class="group bg-light text-surface group relative my-1.5 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded py-1.5 font-bold"
>
	<div
		class="absolute inset-0 h-full w-0 bg-accent transition-all duration-300 group-hover:w-full"
	></div>
	<Google classes="relative pointer-events-none size-6" />
	<p class="relative">Google</p>
</a>
<a
	href="/dashboard"
	class="group bg-light text-surface group relative my-1.5 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded py-1.5 font-bold"
>
	<div
		class="absolute inset-0 h-full w-0 bg-accent transition-all duration-300 group-hover:w-full"
	></div>
	<UserIcon class="pointer-events-none relative size-6" />
	<p class="relative">Guest</p>
</a>
