<script lang="ts">
	import { _ } from 'svelte-i18n';

	const t = _;
</script>

<h1>{$t('title')}</h1>

<h1 class="text-primary text-xl font-bold">{$t('finances.income')}</h1>

<!-- <p>{$t('greeting', { values: { name: 'Carlos' } })}</p> -->
