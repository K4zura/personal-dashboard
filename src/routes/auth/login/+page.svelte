<script lang="ts">
	import Field from '$lib/components/auth/Field.svelte';
	import Header from '$lib/components/auth/Header.svelte';
	import SocialLinks from '$lib/components/auth/SocialLinks.svelte';
</script>

<Header title="ACCESS_PORTAL" subtitle="ENTER_CREDENTIALS" />

<Field type="text" id="username">Username</Field>
<Field type="password" id="password">Password</Field>
<a
	href="/"
	class="text-light hover:drop-shadow-primary -translate-y-1 self-end px-2 text-xs font-semibold drop-shadow-md drop-shadow-transparent sm:text-sm lg:-translate-y-1"
	>Forgot the password?</a
>

<button
	class="bg-primary group relative my-3 w-full cursor-pointer overflow-hidden rounded py-1 font-bold not-sm:text-sm sm:py-2"
>
	<p class="text-light relative z-10">START</p>
	<div
		class="bg-accent absolute inset-0 h-full w-0 transition-all duration-300 group-hover:w-full"
	></div>
</button>

<SocialLinks />

<p class="text-xs sm:text-sm">NEW_USER?</p>
<a
	href="/auth/register"
	class="text-primary hover:drop-shadow-secondary text-xs font-semibold drop-shadow-sm drop-shadow-transparent sm:text-sm"
	>REGISTER_NOW</a
>
