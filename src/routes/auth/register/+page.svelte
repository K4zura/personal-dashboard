<script lang="ts">
	import Field from '$lib/components/auth/Field.svelte';
	import Header from '$lib/components/auth/Header.svelte';
	import SocialLinks from '$lib/components/auth/SocialLinks.svelte';
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>Dashboard | {$_('auth.register.page')}</title>
</svelte:head>

<Header title={$_('auth.register.title')} subtitle={$_('auth.register.subtitle')} />

<Field type="text" id="username">{$_('auth.register.field_1')}</Field>
<Field type="email" id="email">{$_('auth.register.field_2')}</Field>
<Field type="password" id="password">{$_('auth.register.field_3')}</Field>

<button
	class="bg-primary group relative my-3 w-full cursor-pointer overflow-hidden rounded py-2 font-bold"
>
	<p class="text-light relative z-10">{$_('auth.register.start')}</p>
	<div
		class="bg-accent absolute inset-0 h-full w-0 transition-all duration-300 group-hover:w-full"
	></div>
</button>

<SocialLinks />

<p class="text-xs sm:text-sm">{$_('auth.register.existing_user')}</p>
<a
	href="/auth/login"
	class="text-primary hover:drop-shadow-secondary text-xs font-semibold drop-shadow-sm drop-shadow-transparent sm:text-sm"
	>{$_('auth.register.login_now')}</a
>
