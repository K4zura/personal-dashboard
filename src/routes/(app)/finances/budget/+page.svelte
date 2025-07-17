<script lang="ts">
	import { _ } from 'svelte-i18n';

	const t = _;
</script>

<svelte:head>
	<title>Dashboard | {$_('finances.budget.title')}</title>
</svelte:head>

<h1 class="text-primary text-xl font-bold">{$t('finances.budget.title')}</h1>

<!-- <p>{$t('greeting', { values: { name: 'Carlos' } })}</p> -->
