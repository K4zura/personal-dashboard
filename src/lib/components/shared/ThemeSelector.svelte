<script lang="ts">
	import { store } from '$lib/stores/config.svelte';
	import { onMount } from 'svelte';
	import * as db from '$lib/db';

	let theme: string = $state(store.theme);

	function applyTheme(t: string) {
		theme = t;
		document.documentElement.className = t;
		localStorage.setItem('theme', t);
	}

	async function onChange(event: Event) {
		const select = event.target as HTMLSelectElement;
		applyTheme(select.value);
		await db.income.changeTheme(select.value);
	}

	onMount(async () => {
		applyTheme(theme ?? localStorage.getItem('theme'));
	});
</script>

<select
	bind:value={theme}
	onchange={onChange}
	class="bg-surface text-light rounded border-0 py-1 text-sm lowercase ring-0"
>
	<option value="theme-dark">Dark</option>
	<option value="theme-jinwoo">Jinwoo</option>
	<option value="theme-dracula">Dracula</option>
	<option value="theme-aurora">Aurora</option>
	<option value="theme-sakura">Sakura</option>
	<option value="theme-retro-pop">Retro Pop</option>
	<option value="theme-minimal-mint">Minimal Mint</option>
	<option value="theme-sunrise">Sunrise</option>
	<option value="theme-ice-blue">Ice Blue</option>
	<option value="theme-neo-tokyo">Neo Tokyo</option>
	<option value="theme-midnight-green">Midnight Green</option>
	<option value="theme-carbon">Carbon</option>
	<option value="theme-galaxy">Galaxy</option>
	<option value="theme-dark-forest">Dark Forest</option>
	<option value="theme-void-glow">Void Glow</option>
	<option value="theme-inkwell">Inkwell</option>
</select>
