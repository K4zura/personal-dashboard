<script lang="ts">
	import { storeConfig } from '$lib/features/layout';
	import '$lib/i18n';
	import { LangSelect, Loader, ThemeSelect } from '$lib/ui';
	import '$styles/app.css';
	import { Cross, Flower, Skull } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { waitLocale } from 'svelte-i18n';

	let { children } = $props();
	let loading = $state(true);

	const figures = [
		{
			title: 'sakura',
			icon: Flower
		},
		{
			title: 'dark',
			icon: Skull
		},
		{
			title: 'dracula',
			icon: Cross
		}
	];

	let figureInfo = $derived(figures.find((f) => storeConfig.theme.includes(f.title)));
	let Figure = $state(Cross);

	$effect(() => {
		Figure = figureInfo?.icon ?? Cross;
	});

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
			<ThemeSelect />
			<LangSelect />
		</div>
		<div
			class="bg-surface border-primary relative flex h-min w-full max-w-[450px] min-w-80 flex-col items-center overflow-hidden border-4 px-8 py-6"
		>
			{#if Figure}
				<Figure class="text-tertiary absolute -inset-2 size-8 rotate-45" />
				<Figure class="text-accent absolute -top-2 -right-2 size-8 rotate-45" />
				<Figure class="text-error absolute -bottom-2 -left-2 size-8 rotate-45" />
				<Figure class="text-success absolute -right-2 -bottom-2 size-8 rotate-45" />
			{/if}
			{@render children()}
		</div>
	</main>
{/if}
