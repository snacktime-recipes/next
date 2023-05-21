<script lang="ts">
	import { onMount } from 'svelte';
	import { LandingHeader } from '$lib/components';

	onMount(async () => {
		// @todo
		// check if user is authorized or no
	});
</script>

<main class="bg-zinc-50 dark:bg-zinc-950 min-h-screen">
	<LandingHeader />

	<slot />
</main>