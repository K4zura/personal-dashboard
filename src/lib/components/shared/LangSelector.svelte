<script lang="ts">
	import { changeLocale } from '$lib/i18n';
	import { store } from '$lib/stores/config.svelte';
	import { onMount } from 'svelte';
	import * as db from '$lib/api/db';

	let lang: string = $state(store.lang || 'ja');

	function applyLang(l: string) {
		lang = l;
		localStorage.setItem('lang', l);
		changeLocale(l);
	}

	async function onChangeLang(event: Event) {
		const select = event.target as HTMLSelectElement;
		applyLang(select.value);
		await db.config.changeLang(select.value);
	}

	onMount(async () => {
		applyLang(lang ?? localStorage.getItem('lang'));
	});
</script>

<select
	bind:value={lang}
	onchange={onChangeLang}
	class="bg-surface text-light rounded border-0 py-1 pr-7 text-sm ring-0"
>
	<option value="en">🇺🇸 en</option>
	<option value="es">🇪🇸 es</option>
	<option value="fr">🇫🇷 fr</option>
	<option value="ja">🇯🇵 ja</option>
</select>
