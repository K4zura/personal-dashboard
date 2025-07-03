<script lang="ts">
	import '../app.css';
	import '$lib/i18n';
	import { changeLocale } from '$lib/i18n';
	let { children } = $props();
</script>

<svelte:head>
	<title>Personal Dashboard</title>
</svelte:head>
<nav>
	<a href="/">Home</a>
	<a href="/dashboard/finance">Finance</a>
	<a href="/dashboard/settings">Settings</a>
</nav>
<button class="bg-secondary cursor-pointer rounded px-3 py-2" onclick={() => changeLocale('en')}
	>English</button
>
<button class="bg-secondary cursor-pointer rounded px-3 py-2" onclick={() => changeLocale('es')}
	>Español</button
>
<button class="bg-secondary cursor-pointer rounded px-3 py-2" onclick={() => changeLocale('fr')}
	>Français</button
>
<main>
	{@render children()}
</main>
