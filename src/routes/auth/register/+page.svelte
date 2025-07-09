<script>
	import Field from '$lib/components/auth/Field.svelte';
	import FormCard from '$lib/components/auth/FormCard.svelte';
	import InfoCard from '$lib/components/auth/InfoCard.svelte';
</script>

<InfoCard side="right" />
<FormCard side="left" post="/api/auth/register">
	REGISTER
	{#snippet fields()}
		<Field id="username" type="text">Username</Field>
		<Field id="email" type="email">E-mail</Field>
		<Field id="password" type="password">Password</Field>
		<Field id="confirm-password" type="password">Confirm password</Field>
	{/snippet}
</FormCard>
