<script lang="ts">
	import LL from "$i18n/i18n-svelte";
</script>

<!-- @todo check if user is logged in -->
<button class="rounded-full px-5 py-2 bg-zinc-100 dark:bg-zinc-900">
    <p class="text-zinc-600 dark:text-zinc-400">{ $LL.header.signInButton() }</p>
</button>