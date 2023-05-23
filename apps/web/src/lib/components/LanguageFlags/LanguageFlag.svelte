<script lang="ts">
	import type { Locales } from "$i18n/i18n-types";
	import { FlagIcon } from "./index";

	let className = "";

    export let lang: Locales = "ua";
	export { className as class };
</script>

<svelte:component this={FlagIcon[lang]} class={className} />