<script lang="ts">
	import {
		Home,
		Settings,
		DollarSign,
		TrendingDown,
		TrendingUp,
		PiggyBank,
		Wallet,
		Folder,
		Check,
		Notebook,
		Target,
		BookHeart,
		Calendar,
		Clock,
		Book,
		ChevronDown,
		ChevronUp
	} from 'lucide-svelte';
	import imgProfile from '$assets/images/jinwoo.avif';
	import { slide } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { changeLocale } from '$lib/i18n';
	import { getStores } from '$app/stores';
	const { page } = getStores();
	import { Motion } from 'svelte-motion';

	let top = $state(0);
	let left = $state(0);
	let width = $state(0);
	let height = $state(0);
	let opacity = $state(0);
	let routeId = $derived($page.url.pathname);
	const { data } = $props();
	let userName = $state('Jinwoo');
	let userImg = $state(imgProfile);

	if (data.user) {
		userName = data.user.user_metadata.full_name;
		userImg = data.user.user_metadata.avatar_url;
	}

	let { supabase } = $derived(data);
	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};

	const menuItems = $state([
		{
			title: 'dashboard.title', // La clave para Dashboard
			icon: Home,
			url: '/dashboard'
		},
		{
			title: 'finances.title', // La clave para Finances
			icon: DollarSign,
			items: [
				{ title: 'finances.income.title', url: '/finances/income', icon: TrendingUp },
				{ title: 'finances.expenses.title', url: '/finances/expense', icon: TrendingDown },
				{ title: 'finances.savings.title', url: '/finances/savings', icon: PiggyBank },
				{ title: 'finances.budget.title', url: '/finances/budget', icon: Wallet }
			]
		},
		{
			title: 'productivity.title', // La clave para Productivity
			icon: Target,
			items: [
				{ title: 'productivity.projects.title', url: '/productivity/projects', icon: Folder },
				{ title: 'productivity.tasks.title', url: '/productivity/tasks', icon: Check },
				{ title: 'productivity.notes.title', url: '/productivity/notes', icon: Notebook },
				{ title: 'productivity.calendar.title', url: '/productivity/calendar', icon: Calendar }
			]
		},
		{
			title: 'personal_development.title', // La clave para Personal Development
			icon: BookHeart,
			items: [
				{ title: 'personal_development.timer.title', url: '/personal/timer', icon: Clock },
				{ title: 'personal_development.learning.title', url: '/personal/learning', icon: Book },
				{ title: 'personal_development.habits.title', url: '/personal/habits', icon: Target }
			]
		},
		{
			title: 'settings.title', // La clave para Settings
			icon: Settings,
			url: '/settings'
		}
	]);

	let activeSection: {
		title: string;
		icon: any;
		items?: Array<{ title: string; url: string; icon: any }>;
	} | null = $state(null);

	function toggleSection(
		section: {
			title: string;
			icon: any;
			items?: Array<{ title: string; url: string; icon: any }>;
		} | null
	) {
		activeSection = activeSection === section ? null : section;
	}

	$effect(() => {
		menuItems.forEach((section) => {
			if (section.items) {
				if (section.items.some((item) => routeId?.startsWith(item.url))) {
					activeSection = section;
				}
			}
		});
	});
	let positionMotion = (node: HTMLElement) => {
		let refNode = () => {
			let mint = node.getBoundingClientRect();
			top = node.offsetTop;
			left = node.offsetLeft;
			width = mint.width;
			height = mint.height;
			opacity = 1;
		};
		node.addEventListener('mouseenter', refNode);
		return {
			destroy() {
				node.removeEventListener('mouseenter', refNode);
			}
		};
	};
</script>

<aside
	class="bg-surface relative flex h-full flex-col justify-between overflow-x-hidden overflow-y-auto rounded p-2 transition-transform [grid-area:aside] not-md:absolute not-md:inset-0 not-md:z-30 not-md:h-screen not-md:w-[240px] not-md:-translate-x-[240px] not-md:rounded-none peer-has-checked:translate-x-0"
>
	<section class="mx-2 mt-2 flex grow basis-0 flex-col items-center gap-1">
		<picture
			class="border-dark shadow-primary mx-1 size-28 overflow-hidden rounded-full border-4 shadow-[0_0_5px_2px]"
		>
			<img
				loading="eager"
				src={userImg}
				alt="img profile of Jinwoo"
				class="aspect-square size-full object-cover object-center"
			/>
		</picture>
		<h2 class="text-light text-center text-xl font-extrabold uppercase">{userName}</h2>
	</section>
	<nav
		class="relative flex flex-col justify-center gap-1"
		onmouseleave={() => {
			opacity = 0;
		}}
	>
		{#each menuItems as section}
			{@const IconItem = !section.items ? section.icon : section.icon}
			{#if !section.items}
				<a
					href={section.url}
					use:positionMotion
					class:active={routeId === section.url}
					class="text-light z-10 flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-2 text-[14px] font-extrabold select-none"
				>
					<IconItem class="size-4" />
					{$t(section.title)}
				</a>
			{:else}
				<button
					type="button"
					aria-expanded={activeSection === section}
					aria-controls="id-seccion"
					use:positionMotion
					class="text-light z-10 flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-1.5 py-2 text-[14px] font-extrabold select-none"
					onclick={() => toggleSection(section)}
				>
					<span class="flex items-center gap-2">
						<IconItem class="size-4" />
						{$t(section.title)}
					</span>
					{#if activeSection === section}
						<ChevronUp class="h-4 w-4 transition-transform duration-200" />
					{:else}
						<ChevronDown class="h-4 w-4 transition-transform duration-200" />
					{/if}
				</button>
			{/if}
			{#if activeSection === section && section.items}
				<ul class="border-disabled mb-2 ml-4 flex flex-col gap-0.5 border-l pl-3" transition:slide>
					{#each section.items as item}
						{@const IconSubItem = section.items ? item.icon : item.icon}
						<li class="z-10">
							<a
								href={item.url}
								use:positionMotion
								class:active={routeId === item.url}
								class="flex items-center gap-2 rounded-lg px-1.5 py-1.5 text-sm"
							>
								<IconSubItem class="size-4" />
								{$t(item.title)}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		{/each}
		<Motion
			animate={{
				top,
				left,
				width,
				height,
				opacity
			}}
			transition={{
				type: 'spring',
				stiffness: 400,
				damping: 30
			}}
			let:motion
		>
			<li use:motion class="bg-hover absolute z-0 rounded-lg"></li>
		</Motion>
	</nav>
	<div class="flex grow basis-0 flex-col justify-end gap-2">
		<button class="bg-primary cursor-pointer rounded px-3 py-2" onclick={() => changeLocale('en')}>
			English
		</button>
		<button class="bg-primary cursor-pointer rounded px-3 py-2" onclick={() => changeLocale('es')}>
			Español
		</button>
		<button class="bg-primary cursor-pointer rounded px-3 py-2" onclick={() => changeLocale('fr')}>
			Français
		</button>
		<button class="bg-primary cursor-pointer rounded px-3 py-2" onclick={() => changeLocale('jp')}>
			日本語
		</button>
		<button class="bg-primary cursor-pointer rounded px-3 py-2" onclick={logout}>Logout</button>
	</div>
</aside>

<style>
	.active {
		background-color: var(--color-hover);
	}

	aside {
		--sb-track-color: #232e3300;
		--sb-thumb-color: #6baf8d00;
		--sb-size: 0px;
	}

	aside::-webkit-scrollbar {
		width: var(--sb-size);
	}

	aside::-webkit-scrollbar-track {
		background: var(--sb-track-color);
		border-radius: 3px;
	}

	aside::-webkit-scrollbar-thumb {
		background: var(--sb-thumb-color);
		border-radius: 3px;
	}

	@supports not selector(::-webkit-scrollbar) {
		aside {
			scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
		}
	}
</style>
