<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { setLocale } from '$i18n/i18n-svelte';

	export let data: import('./$types').LayoutData;

	setLocale(data.locale);

	onMount(async () => {
		// @todo
		// check if user is authorized or no
	});
</script>

<slot />