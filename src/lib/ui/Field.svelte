<script lang="ts">
	interface Props {
		id: string;
		type: string;
		span: string;
	}

	const { id, type, span }: Props = $props();
</script>

<label for={id} class="flex flex-col gap-2 {span}">
	<p class="border-secondary border-l-2 px-1 text-xs font-semibold">{id}</p>

	<input
		{type}
		name={id}
		{id}
		class="bg-border shadow-hover border-none shadow ring-0"
		placeholder={id.toLowerCase()}
	/>
</label>
