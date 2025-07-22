<script lang="ts">
	interface Props {
		id: string;
		type: string;
		span: string;
	}

	const { id, type, span }: Props = $props();
</script>

<input
	{type}
	name={id}
	{id}
	class="col-span-{span} bg-border shadow-hover border-none shadow ring-0"
	placeholder={id.toLowerCase()}
/>
