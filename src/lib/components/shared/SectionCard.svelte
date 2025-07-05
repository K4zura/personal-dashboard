<script lang="ts">
	export let title: string;
	export let subtitle: string;
	export let colSpan: string = 'col-span-2';
	export let filter: HTMLElement;
</script>

<article class={`bg-surface relative flex flex-col justify-center ${colSpan} gap-4 rounded p-4`}>
	<div class="flex items-center justify-between">
		<div class="flex flex-col justify-between">
			<h2 class="text-2xl font-semibold">{title}</h2>
			<p class="text-sm text-gray-300">{subtitle}</p>
		</div>
		{filter}
	</div>
	<slot />
</article>
