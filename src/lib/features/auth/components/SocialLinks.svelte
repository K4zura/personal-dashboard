<script>
	import { Chrome, Github, User } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';
</script>

<div class="my-1 flex w-full items-center">
	<div class="to-secondary h-0.5 flex-1 bg-gradient-to-r from-transparent"></div>
	<span class="text-text-secondary px-4 text-xs">{$_('auth.login.alternative')}</span>
	<div class="from-secondary h-0.5 flex-1 bg-gradient-to-r to-transparent"></div>
</div>

<div class="flex w-full gap-2">
	<a
		href="/auth/login/google"
		class="group bg-card-bg text-warning shadow-warning relative my-1.5 flex flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded py-1.5 font-bold hover:shadow-[0_0_2px_2px]"
	>
		<Chrome class="pointer-events-none relative size-4 sm:size-6" />
	</a>
	<a
		href="/auth/login/google"
		class="group bg-card-bg text-text shadow-text relative my-1.5 flex flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded py-1.5 font-bold hover:shadow-[0_0_2px_2px]"
	>
		<Github class="pointer-events-none relative size-4 sm:size-6" />
	</a>
	<a
		href="/dashboard"
		class="group bg-card-bg text-success shadow-success relative my-1.5 flex flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded py-1.5 font-bold hover:shadow-[0_0_2px_2px]"
	>
		<User class="pointer-events-none relative size-4 sm:size-6" />
	</a>
</div>

<div class="my-3 mt-4 flex w-full items-center">
	<div class="via-secondary h-0.5 flex-1 bg-gradient-to-r from-transparent to-transparent"></div>
</div>
