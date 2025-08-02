<script lang="ts">
	interface Props {
		text: string;
		color?: string;
		rounded?: string;
		size?: string;
	}

	const { text, color = 'bg-secondary', rounded, size = 'xs' }: Props = $props();
</script>

<span
	class="px-3 text-{size} rounded{rounded} {color} flex w-max items-center justify-center py-1 select-none"
>
	{text}
</span>
