<script lang="ts">
	import { changeLocale } from '$lib/i18n';
	import { onMount } from 'svelte';

	let lang: string = $state('es');

	function applyLang(l: string) {
		lang = l;
		localStorage.setItem('lang', l);
		changeLocale(l);
	}

	function onChangeLang(event: Event) {
		const select = event.target as HTMLSelectElement;
		applyLang(select.value);
	}

	onMount(async () => {
		applyLang(localStorage.getItem('lang') ?? lang);
	});
</script>

<select
	bind:value={lang}
	onchange={onChangeLang}
	class="bg-surface text-light rounded border-0 py-1 pr-7 text-sm ring-0"
>
	<option value="en">🇺🇸</option>
	<option value="es">🇪🇸</option>
	<option value="fr">🇫🇷</option>
	<option value="jp">🇯🇵</option>
</select>
