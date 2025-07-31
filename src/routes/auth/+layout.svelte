<script lang="ts">
	import { storeConfig } from '$lib/features/layout';
	import '$lib/i18n';
	import { LangSelect, Loader, ThemeSelect } from '$lib/ui';
	import '$styles/app.css';
	import {
		Cross,
		Flame,
		Flower,
		Lightbulb,
		Popsicle,
		Radical,
		ReceiptJapaneseYen,
		Skull,
		Sparkle,
		Square,
		Swords
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { waitLocale } from 'svelte-i18n';

	let { children } = $props();
	let loading = $state(true);

	const figures = [
		{
			title: 'theme-dark',
			icon: Skull,
			rotate: 45
		},
		{
			title: 'theme-jinwoo',
			icon: Swords,
			rotate: 225
		},
		{
			title: 'theme-dracula',
			icon: Cross,
			rotate: 0
		},
		{
			title: 'theme-aurora',
			icon: Lightbulb,
			rotate: 45
		},
		{
			title: 'theme-sakura',
			icon: Flower,
			rotate: 0
		},
		{
			title: 'theme-sakura-dark',
			icon: Flower,
			rotate: 45
		},
		{
			title: 'theme-ice-blue',
			icon: Popsicle,
			rotate: 45
		},
		{
			title: 'theme-neo-tokyo',
			icon: ReceiptJapaneseYen,
			rotate: 15
		},
		{
			title: 'theme-midnight-green',
			icon: Square,
			rotate: 15
		},
		{
			title: 'theme-carbon',
			icon: Flame,
			rotate: 0
		},
		{
			title: 'theme-galaxy',
			icon: Sparkle, // or Satellite
			rotate: 25
		},
		{
			title: 'theme-void-glow',
			icon: Radical,
			rotate: 15
		},
		{
			title: 'theme-inkwell',
			icon: Radical,
			rotate: 45
		}
	];

	let figureInfo = $derived(figures.find((f) => storeConfig.theme === f.title));
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
	<main class="bg-bg relative flex min-h-dvh flex-col items-center justify-center gap-3 px-7">
		<div class="absolute inset-0 grid h-full w-full grid-cols-2 items-center">
			{#if Figure}
				<Figure class="text-info mx-auto size-24" style={`rotate: -${figureInfo?.rotate}deg`} />
				<Figure class="text-accent mx-auto size-24" style={`rotate: ${figureInfo?.rotate}deg`} />
				<Figure
					class="text-error mx-auto size-24"
					style={`rotate: -${figureInfo?.rotate !== 0 ? (figureInfo?.rotate as number) + 90 : 0}deg`}
				/>
				<Figure
					class="text-success mx-auto size-24"
					style={`rotate: ${figureInfo?.rotate !== 0 ? (figureInfo?.rotate as number) + 90 : 0}deg`}
				/>
			{/if}
		</div>
		<!-- <div
			class="absolute inset-0 bg-[url('https://wallpapercave.com/wp/wp8170161.jpg')] bg-cover bg-center"
		></div>
		<div class="absolute inset-0 backdrop-blur-lg"></div> -->

		<div class="z-10 flex gap-2 self-center">
			<ThemeSelect />
			<LangSelect />
		</div>
		<div
			class="bg-bg-secondary border-border relative flex h-min w-full max-w-[450px] min-w-80 flex-col items-center overflow-hidden border-4 px-8 py-6"
		>
			<!-- {#if Figure}
				<Figure
					class="text-tertiary absolute -inset-1 size-8"
					style={`rotate: -${figureInfo?.rotate}deg`}
				/>
				<Figure
					class="text-accent absolute -top-1 -right-1 size-8"
					style={`rotate: ${figureInfo?.rotate}deg`}
				/>
				<Figure
					class="text-error absolute -bottom-1 -left-1 size-8"
					style={`rotate: -${(figureInfo?.rotate as number) * 3}deg`}
				/>
				<Figure
					class="text-success absolute -right-1 -bottom-1 size-8"
					style={`rotate: ${(figureInfo?.rotate as number) * 3}deg`}
				/>
			{/if} -->
			{@render children()}
		</div>
	</main>
{/if}
