<script lang="ts">
	import { StartButton, Field, Header, SocialLinks } from '$lib/features/auth';
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('auth.login.page')}</title>
</svelte:head>

<Header title={$_('auth.login.title')} subtitle={$_('auth.login.subtitle')} />

<form method="POST" action="/auth/login/email" class="flex w-full flex-col gap-2">
	<Field type="email" id="email">{$_('auth.login.field_1')}</Field>
	<Field type="password" id="password">{$_('auth.login.field_2')}</Field>
	<a
		href="/"
		class="text-text-secondary hover:drop-shadow-primary self-end text-xs font-semibold drop-shadow-md drop-shadow-transparent sm:text-sm"
		>{$_('auth.login.forgot_password')}</a
	>

	<StartButton>
		{$_('auth.login.start')}
	</StartButton>
</form>

<SocialLinks />

<p class="text-text text-xs sm:text-sm">{$_('auth.login.new_user')}</p>
<a
	href="/auth/register"
	class="text-primary hover:drop-shadow-primary-hover text-xs font-semibold drop-shadow-sm drop-shadow-transparent sm:text-sm"
	>{$_('auth.login.register_now')}</a
>
