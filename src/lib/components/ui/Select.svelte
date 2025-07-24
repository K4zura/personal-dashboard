<script lang="ts">
	import { _ } from 'svelte-i18n';

	interface Props {
		id: string;
		span: string;
		forType?: string;
		values?: string[];
	}
	let { id, span, forType, values }: Props = $props();

	const options = $derived(() => {
		if (id === 'type' && forType !== 'frecuency') {
			return [
				{ value: 'fixed', label: $_('types.fixed') },
				{ value: 'variable', label: $_('types.variable') }
			];
		} else if (id === 'type') {
			return [
				{ value: 'ocasional', label: $_('types.occasional') },
				{ value: 'daily', label: $_('types.daily') },
				{ value: 'monthly', label: $_('types.monthly') }
			];
		}
		return values?.map((value) => ({ value, label: value })) || [];
	});
</script>

<select
	{id}
	name={id}
	value={options().length > 0 ? options()[0].value : ''}
	class="{span} bg-border shadow-hover border-none shadow ring-0"
>
	{#each options() as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
