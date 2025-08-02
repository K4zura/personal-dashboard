<script lang="ts">
	import { changeLocale } from '$lib/i18n';
	import { storeConfig } from '$lib/features/layout';
	import { onMount } from 'svelte';
	import { db } from '$lib/features/finance';

	let lang: string = $state(storeConfig.lang || 'ja');

	function applyLang(l: string) {
		lang = l;
		localStorage.setItem('lang', l);
		changeLocale(l);
	}

	async function onChangeLang(event: Event) {
		const select = event.target as HTMLSelectElement;
		applyLang(select.value);
		if (storeConfig.userID !== '') {
			await db.config.changeLang(select.value);
		}
	}

	onMount(async () => {
		applyLang(lang ?? localStorage.getItem('lang'));
	});
</script>

<select
	bind:value={lang}
	onchange={onChangeLang}
	class="bg-bg-secondary text-text rounded border-0 py-1 pr-7 text-sm ring-0"
>
	<option value="en">🇺🇸 en</option>
	<option value="es">🇪🇸 es</option>
	<option value="fr">🇫🇷 fr</option>
	<option value="ja">🇯🇵 ja</option>
</select>
