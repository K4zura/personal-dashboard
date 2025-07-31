<script lang="ts">
	import { User } from 'lucide-svelte';

	interface Props {
		title: string;
		subtitle: string;
	}

	const { title, subtitle }: Props = $props();
</script>

<div
	class="border-primary bg-card-bg my-4 mb-7 flex size-16 rotate-45 items-center justify-center border-4 sm:size-20"
>
	<User class="text-primary size-6 -rotate-45 sm:size-8" />
</div>
<h1 class="text-text text-2xl font-bold sm:text-3xl">{title}</h1>
<p class="text-text-secondary my-2 mb-6 text-xs">{subtitle}</p>
