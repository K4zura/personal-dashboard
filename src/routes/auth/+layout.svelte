<script lang="ts">
	import '../../app.css';
	import '$lib/i18n';
	import { onMount } from 'svelte';
	import { waitLocale } from 'svelte-i18n';
	import ThemeSelector from '$lib/components/shared/ThemeSelector.svelte';
	import LangSelector from '$lib/components/shared/LangSelector.svelte';
	import Loader from '$lib/components/layout/Loader.svelte';

	let { children } = $props();
	let loading = $state(true);

	onMount(async () => {
		await waitLocale();
		loading = false;
	});
</script>

<svelte:head>
	<title>Dashboard | Auth</title>
</svelte:head>

{#if loading}
	<div class="flex h-screen items-center justify-center">
		<Loader />
	</div>
{:else}
	<main class="bg-dark relative flex min-h-dvh flex-col items-center justify-center gap-3 px-7">
		<div class="flex gap-2 self-center">
			<ThemeSelector />
			<LangSelector />
		</div>
		<div
			class="bg-surface border-primary relative flex h-min w-full max-w-[450px] min-w-80 flex-col items-center overflow-hidden border-4 px-8 py-6"
		>
			<span class="bg-tertiary absolute -inset-2 size-8 rotate-45"></span>
			<span class="bg-accent absolute -top-2 -right-2 size-8 rotate-45"></span>
			<span class="bg-error absolute -bottom-2 -left-2 size-8 rotate-45"></span>
			<span class="bg-success absolute -right-2 -bottom-2 size-8 rotate-45"></span>
			{@render children()}
		</div>
	</main>
{/if}
