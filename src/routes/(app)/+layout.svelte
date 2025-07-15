<script lang="ts">
	import '../../app.css';
	import '$lib/i18n';
	import { onMount } from 'svelte';
	import { waitLocale } from 'svelte-i18n';
	import SideBar from '$lib/components/layout/SideBar.svelte';
	import { invalidate } from '$app/navigation';
	let { data, children } = $props();
	let { supabase, session } = data;

	let theme = $state('');

	function applyTheme(t: string) {
		theme = t;
		document.documentElement.className = t;
		localStorage.setItem('theme', t);
	}
	function onChange(event: Event) {
		const select = event.target as HTMLSelectElement; // ① cast explícito
		applyTheme(select.value);
	}

	$effect(() => {
		({ supabase, session } = data);
	});

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => data.subscription.unsubscribe();
	});

	let loading = $state(true);

	onMount(async () => {
		applyTheme(localStorage.getItem('theme') ?? theme);
		await waitLocale(); // Espera a que el idioma se cargue
		loading = false; // Cambia el estado de carga cuando el idioma esté listo
	});
</script>

<svelte:head>
	<title>Personal Dashboard</title>
</svelte:head>

{#if loading}
	<div>Loading...</div>
{:else}
	<div id="app" class="relative p-4 md:gap-4">
		<select
			bind:value={theme}
			onchange={onChange}
			class="bg-surface text-text absolute top-2 right-2 rounded border-0 py-1 ring-0"
		>
			<option value="theme-dark">Dark</option>
			<option value="theme-light">Light</option>
			<option value="theme-jinwoo">Jinwoo</option>
			<option value="theme-dracula">Dracula</option>
			<option value="theme-aurora">Aurora</option>
			<option value="theme-neon">Neon</option>
		</select>
		<button
			class="peer bg-primary absolute top-0 left-0 hidden h-8 w-8 cursor-pointer rounded-br-xl transition-transform not-md:block has-checked:translate-x-[240px]"
			>O
			<input type="checkbox" class="absolute inset-0 h-full w-full opacity-0" /></button
		>
		<SideBar {data} />

		<main class="flex flex-col gap-4 overflow-y-auto p-3 [grid-area:main]">
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
