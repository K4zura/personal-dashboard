<script lang="ts">
	import SearchBar from './SearchBar.svelte';
	import ThemeSelector from '../shared/ThemeSelector.svelte';
	import LangSelector from '../shared/LangSelector.svelte';
</script>

<header class="flex h-14 items-center justify-between px-6 backdrop-blur-xl [grid-area:header]">
	<div>
		<SearchBar />
	</div>
	<div>
		<ThemeSelector />
		<LangSelector />
	</div>
</header>
