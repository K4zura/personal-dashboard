<script>
	import Field from '$lib/components/auth/Field.svelte';
	import FormCard from '$lib/components/auth/FormCard.svelte';
	import InfoCard from '$lib/components/auth/InfoCard.svelte';
</script>

<InfoCard side="left" />
<FormCard side="right" post="/api/auth/signin">
	LOGIN
	{#snippet fields()}
		<Field id="email" type="email">E-mail</Field>
		<Field id="password" type="password">Password</Field>
		<a
			href="/"
			class="text-dark hover:drop-shadow-primary -translate-y-3 px-2 text-xs font-bold drop-shadow-md drop-shadow-transparent"
			>Forgot the password?</a
		>
	{/snippet}
</FormCard>
