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
	import { slide } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { changeLocale } from '$lib/i18n';

	// const t = _;

	const menuItems = [
		{
			title: 'aside.dashboard', // La clave para Dashboard
			icon: Home,
			url: '/dashboard'
		},
		{
			title: 'aside.finances.title', // La clave para Finances
			icon: DollarSign,
			items: [
				{ title: 'aside.finances.income', url: '/finances/income', icon: TrendingUp },
				{ title: 'aside.finances.expenses', url: '/finances/expense', icon: TrendingDown },
				{ title: 'aside.finances.savings', url: '/finances/savings', icon: PiggyBank },
				{ title: 'aside.finances.budget', url: '/finances/budget', icon: Wallet }
			]
		},
		{
			title: 'aside.productivity.title', // La clave para Productivity
			icon: Target,
			items: [
				{ title: 'aside.productivity.projects', url: '/productivity/projects', icon: Folder },
				{ title: 'aside.productivity.tasks', url: '/productivity/tasks', icon: Check },
				{ title: 'aside.productivity.notes', url: '/productivity/notes', icon: Notebook },
				{ title: 'aside.productivity.calendar', url: '/productivity/calendar', icon: Calendar }
			]
		},
		{
			title: 'aside.personal_development.title', // La clave para Personal Development
			icon: BookHeart,
			items: [
				{ title: 'aside.personal_development.timer', url: '/personal/timer', icon: Clock },
				{ title: 'aside.personal_development.learning', url: '/personal/learning', icon: Book },
				{ title: 'aside.personal_development.habits', url: '/personal/habits', icon: Target }
			]
		},
		{
			title: 'aside.settings', // La clave para Settings
			icon: Settings,
			url: '/settings'
		}
	];

	let activeSection: {
		title: string;
		icon: any;
		items?: Array<{ title: string; url: string; icon: any }>;
	} | null = null;

	const toggleSection = (
		section: {
			title: string;
			icon: any;
			items?: Array<{ title: string; url: string; icon: any }>;
		} | null
	) => {
		activeSection = activeSection === section ? null : section;
	};
</script>

<aside class="bg-secondary flex h-full flex-col justify-between rounded p-2 [grid-area:aside]">
	<section class="mx-4 mt-4 flex grow basis-0 flex-col items-center gap-0.5">
		<picture class="border-dark mx-1 size-28 overflow-hidden rounded-full border-4">
			<img
				loading="eager"
				src="src/assets/images/jinwoo.avif"
				alt="img profile of Jinwoo"
				class="aspect-square size-full object-cover object-center"
			/>
		</picture>
		<h2 class="text-light text-center text-xl font-extrabold">Jinwoo</h2>
	</section>
	<nav class="flex grow basis-0 flex-col justify-center">
		{#each menuItems as section}
			{#if !section.items}
				<a
					href={section.url}
					class="text-light flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-2 text-[14px] font-extrabold select-none"
				>
					<svelte:component this={section.icon} class="size-4" />
					{$t(section.title)}
				</a>
			{:else}
				<button
					type="button"
					class="text-light flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-1.5 py-2 text-[14px] font-extrabold select-none"
					onclick={() => toggleSection(section)}
				>
					<span class="flex items-center gap-2">
						<svelte:component this={section.icon} class="size-4" />
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
				<ul
					class="border-disabled mb-2 ml-4 flex w-full flex-col gap-0.5 border-l pl-4"
					transition:slide
				>
					{#each section.items as item}
						<li>
							<a href={item.url} class="flex items-center gap-2">
								<svelte:component this={item.icon} class="size-4" />
								{$t(item.title)}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		{/each}
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
	</div>
</aside>
