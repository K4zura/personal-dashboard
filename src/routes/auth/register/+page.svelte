<script lang="ts">
	import Field from '$lib/components/auth/Field.svelte';
	import { Chrome, Github, User, UserIcon } from 'lucide-svelte';

</script>

<div
	class="border-primary bg-border my-4 mb-7 flex size-20 rotate-45 items-center justify-center border-4"
>
	<User class="text-primary size-8 -rotate-45" />
</div>
<h1 class="text-3xl font-bold">CREATE_USER</h1>
<p class="my-2 mb-6 text-xs">REGISTER_NEW_USER</p>
<Field type="text" id="username">Username</Field>
<Field type="email" id="email">E-mail</Field>
<Field type="password" id="password">Password</Field>

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
		<Chrome class="pointer-events-none relative size-6" />
	</a>
	<a
		href="/auth/login/google"
		class="group bg-border text-light shadow-light relative my-1.5 flex flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded py-1.5 font-bold hover:shadow-[0_0_2px_2px]"
	>
		<Github class="pointer-events-none relative size-6" />
	</a>
	<a
		href="/dashboard"
		class="group bg-border text-success shadow-success relative my-1.5 flex flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded py-1.5 font-bold hover:shadow-[0_0_2px_2px]"
	>
		<UserIcon class="pointer-events-none relative size-6" />
	</a>
</div>

<div class="my-3 mt-4 flex w-full items-center">
	<div class="via-secondary h-0.5 flex-1 bg-gradient-to-r from-transparent to-transparent"></div>
</div>

<p class="text-sm">EXISTING_USER?</p>
<a href="/auth/login" class="text-sm font-semibold text-primary hover:drop-shadow-secondary drop-shadow-sm drop-shadow-transparent">LOGIN_NOW</a>