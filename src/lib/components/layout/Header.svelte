<script lang="ts">
	import SearchBar from './SearchBar.svelte';
	import ThemeSelector from '../shared/ThemeSelector.svelte';
	import LangSelector from '../shared/LangSelector.svelte';
</script>

<header
	class="flex min-h-14 items-center justify-between px-10 backdrop-blur-xl [grid-area:header] not-sm:flex-col not-sm:gap-2 not-sm:py-1 md:px-6"
>
	<div>
		<SearchBar />
	</div>
	<div class="flex items-center justify-center gap-2">
		<ThemeSelector />
		<LangSelector />
	</div>
</header>
