<script lang="ts">
	import Field from '$lib/components/auth/Field.svelte';
	import Header from '$lib/components/auth/Header.svelte';
	import SocialLinks from '$lib/components/auth/SocialLinks.svelte';
</script>

<Header title="CREATE_USER" subtitle="REGISTER_NEW_USER" />

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

<SocialLinks />

<p class="text-xs sm:text-sm">EXISTING_USER?</p>
<a
	href="/auth/login"
	class="text-primary hover:drop-shadow-secondary text-xs font-semibold drop-shadow-sm drop-shadow-transparent sm:text-sm"
	>LOGIN_NOW</a
>
