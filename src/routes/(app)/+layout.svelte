<script lang="ts">
	import { afterNavigate, beforeNavigate, invalidate } from '$app/navigation';
	import Loader from '$lib/components/layout/Loader.svelte';
	import SideBar from '$lib/components/layout/SideBar.svelte';
	import PageTransition from '$lib/components/transitions/PageTransition.svelte';
	import '$lib/i18n';
	import { createSupabase } from '$lib/services/supabaseClient';
	import { sideBarOpen } from '$lib/stores/interactions';
	import { setSession } from '$lib/stores/session';
	import { Menu } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { waitLocale } from 'svelte-i18n';
	import '../../app.css';
	import Header from '$lib/components/layout/Header.svelte';

	const supabase = createSupabase(fetch);

	let { data, children } = $props();
	let { session } = data;
	let path: string = $state('');
	let isLoading: boolean = $state(true);
	let pageLoading: boolean = $state(false);

	$effect.pre(() => {
		({ path } = data);
	});

	beforeNavigate(({ to }) => (pageLoading = !!to?.route.id));

	afterNavigate(() => {
		pageLoading = false;
	});

	$effect(() => {
		const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
			setSession(newSession);
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => listener.subscription.unsubscribe();
	});

	onMount(async () => {
		await waitLocale();
		isLoading = false;
	});
</script>

<svelte:head>
	<title>Personal Dashboard</title>
</svelte:head>

{#if isLoading}
	<div class="flex h-screen items-center justify-center">
		<Loader />
	</div>
{:else}
	<div id="app" class="relative overflow-y-hidden">
		<Header />
		<button
			onclick={() => {
				$sideBarOpen = true;
			}}
			class="peer shadow-border absolute top-5 left-1 hidden cursor-pointer rounded-lg shadow not-md:block"
		>
			<Menu class="m-1 size-5" />
		</button>
		<SideBar {data} />
		{#if pageLoading}
			<div class="bg-dark z-50 flex h-full items-center justify-center [grid-area:main]">
				<Loader />
			</div>
		{/if}
		<PageTransition refresh={path}>
			{@render children()}
		</PageTransition>
	</div>
{/if}

<style>
	#app {
		display: grid;
		grid-template-areas:
			'aside header header'
			'aside main main';
		grid-template-columns: 0 1fr;
		grid-template-rows: auto 1fr;
		height: 100vh;
		max-height: 100vh;
	}
	@media (width >= 768px) {
		#app {
			grid-template-columns: 256px 1fr;
		}
	}
</style>
