<script lang="ts">
	import { SearchBar } from '$lib/features/layout';
	import { LangSelect, ThemeSelect } from '$lib/ui';
</script>

<header
	class="flex min-h-14 items-center justify-between px-10 backdrop-blur-xl [grid-area:header] not-sm:flex-col not-sm:gap-2 not-sm:py-1 md:px-6"
>
	<div>
		<SearchBar />
	</div>
	<div class="flex items-center justify-center gap-2">
		<ThemeSelect />
		<LangSelect />
	</div>
</header>
