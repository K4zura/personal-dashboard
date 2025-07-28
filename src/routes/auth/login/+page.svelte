<script lang="ts">
	import Field from '$lib/features/auth/components/Field.svelte';
	import Header from '$lib/features/auth/components/Header.svelte';
	import SocialLinks from '$lib/features/auth/components/SocialLinks.svelte';
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('auth.login.page')}</title>
</svelte:head>

<Header title={$_('auth.login.title')} subtitle={$_('auth.login.subtitle')} />

<form method="POST" action="/auth/login/email" class="flex w-full flex-col">
	<Field type="email" id="email">{$_('auth.login.field_1')}</Field>
	<Field type="password" id="password">{$_('auth.login.field_2')}</Field>
	<a
		href="/"
		class="text-light hover:drop-shadow-primary -translate-y-1 self-end px-2 text-xs font-semibold drop-shadow-md drop-shadow-transparent sm:text-sm lg:-translate-y-1"
		>{$_('auth.login.forgot_password')}</a
	>

	<button
		class="bg-primary group relative my-3 w-full cursor-pointer overflow-hidden rounded py-1 font-bold not-sm:text-sm sm:py-2"
	>
		<p class="text-light relative z-10">{$_('auth.login.start')}</p>
		<div
			class="bg-accent absolute inset-0 h-full w-0 transition-all duration-300 group-hover:w-full"
		></div>
	</button>
</form>

<SocialLinks />

<p class="text-xs sm:text-sm">{$_('auth.login.new_user')}</p>
<a
	href="/auth/register"
	class="text-primary hover:drop-shadow-secondary text-xs font-semibold drop-shadow-sm drop-shadow-transparent sm:text-sm"
	>{$_('auth.login.register_now')}</a
>
