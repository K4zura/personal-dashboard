<script lang="ts">
	import '../../app.css';
	import '$lib/i18n';
	import { onMount } from 'svelte';
	import { waitLocale } from 'svelte-i18n';
	import SideBar from '$lib/components/layout/SideBar.svelte';
	import { invalidate } from '$app/navigation';
	import { createSupabase } from '$lib/services/supabaseClient';
	import { setSession } from '$lib/stores/session';
	import { sideBarOpen } from '$lib/stores/interactions';
	import { Menu } from 'lucide-svelte';
	import { changeLocale } from '$lib/i18n';

	let { data, children } = $props();
	let { session } = data;

	const supabase = createSupabase(fetch);

	let theme = $state('Dark');
	let lang = $state('es');

	function applyTheme(t: string) {
		theme = t;
		document.documentElement.className = t;
		localStorage.setItem('theme', t);
	}

	function applyLang(l: string) {
		lang = l;
		localStorage.setItem('lang', l);
		changeLocale(l);
	}

	function onChange(event: Event) {
		const select = event.target as HTMLSelectElement;
		applyTheme(select.value);
	}

	function onChangeLang(event: Event) {
		const select = event.target as HTMLSelectElement;
		applyLang(select.value);
	}

	$effect(() => {
		const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
			setSession(newSession);
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => listener.subscription.unsubscribe();
	});

	let loading = $state(true);

	onMount(async () => {
		applyTheme(localStorage.getItem('theme') ?? theme);
		applyLang(localStorage.getItem('lang') ?? lang);
		await waitLocale();
		loading = false;
	});
</script>

<svelte:head>
	<title>Personal Dashboard</title>
</svelte:head>

{#if loading}
	<div>Loading...</div>
{:else}
	<div id="app" class="relative md:gap-4 md:p-4">
		<div class="absolute top-2 right-2">
			<select
				bind:value={theme}
				onchange={onChange}
				class="bg-surface text-text rounded border-0 py-1 ring-0"
			>
				<option value="theme-dark">Dark</option>
				<option value="theme-light">Light</option>
				<option value="theme-jinwoo">Jinwoo</option>
				<option value="theme-dracula">Dracula</option>
				<option value="theme-aurora">Aurora</option>
				<option value="theme-neon">Neon</option>
			</select>
			<select
				bind:value={lang}
				onchange={onChangeLang}
				class="bg-surface text-text rounded border-0 py-1 ring-0"
			>
				<option value="en">English</option>
				<option value="es">Español</option>
				<option value="fr">Français</option>
				<option value="jp">日本語</option>
			</select>
		</div>
		<button
			onclick={() => {
				$sideBarOpen = true;
			}}
			class="peer shadow-border absolute top-5 left-1 hidden cursor-pointer rounded-lg shadow not-md:block"
		>
			<Menu class="m-1 size-5" />
		</button>
		<SideBar {data} />

		<main class="flex flex-col gap-4 overflow-y-auto p-3 [grid-area:main] not-md:p-6">
			{@render children()}
		</main>
	</div>
{/if}

<style>
	#app {
		display: grid;
		grid-template-areas: 'aside main main';
		gap: 20px; /* Ajusta esto según tus necesidades */
		grid-template-columns: 0 1fr;
		height: 100vh;
		max-height: 100vh;
	}
	@media (width >= 768px) {
		#app {
			display: grid;
			grid-template-areas: 'aside main main';
			/* 'aside main main'; */
			grid-template-columns: 256px 1fr;
			/* grid-template-rows: auto 1fr; */
		}
	}

	main {
		--sb-track-color: #232e3300;
		--sb-thumb-color: var(--color-primary);
		--sb-size: 3px;
	}

	main::-webkit-scrollbar {
		width: var(--sb-size);
	}

	main::-webkit-scrollbar-track {
		background: var(--sb-track-color);
		border-radius: 3px;
	}

	main::-webkit-scrollbar-thumb {
		background: var(--sb-thumb-color);
		border-radius: 3px;
	}

	@supports not selector(::-webkit-scrollbar) {
		main {
			scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
		}
	}
</style>
