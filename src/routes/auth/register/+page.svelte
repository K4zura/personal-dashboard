<script lang="ts">
	import { StartButton, Field, Header, SocialLinks } from '$lib/features/auth';
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>Dashboard | {$_('auth.register.page')}</title>
</svelte:head>

<Header title={$_('auth.register.title')} subtitle={$_('auth.register.subtitle')} />

<form method="POST" action="/auth/register/email" class="flex w-full flex-col gap-2">
	<Field type="text" id="username">{$_('auth.register.field_1')}</Field>
	<Field type="email" id="email">{$_('auth.register.field_2')}</Field>
	<Field type="password" id="password">{$_('auth.register.field_3')}</Field>

	<StartButton>
		{$_('auth.register.start')}
	</StartButton>
</form>

<SocialLinks />

<p class="text-text text-xs sm:text-sm">{$_('auth.register.existing_user')}</p>
<a
	href="/auth/login"
	class="text-primary hover:drop-shadow-primary-hover text-xs font-semibold drop-shadow-sm drop-shadow-transparent sm:text-sm"
	>{$_('auth.register.login_now')}</a
>
