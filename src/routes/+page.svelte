<script>
	let { data } = $props();
	console.log(data.income);
</script>

<ul class="bg-accent h-full w-full">
	{#each data.income as incm (incm.id)}
		<li class="text-dark text-2xl">{incm.name}</li>
	{/each}
</ul>
