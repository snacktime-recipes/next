<script lang="ts">
    import LL, { locale, setLocale } from '$i18n/i18n-svelte';
    import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import { onMount } from 'svelte';
    
    onMount(async () => {});
</script>

<!-- Hero -->
<section class="h-screen flex items-center justify-between px-12">
    <!-- Text -->
    <div class="w-1/2">
        <h1 class="text-8xl text-zinc-700 dark:text-zinc-300">{ $LL?.landing.title() }</h1>
        <p class="text-4xl text-zinc-600 dark:text-zinc-400">{ $LL?.landing.subtitle() }</p>
    
        <!-- Explore button -->
        <button class="mt-6 bg-indigo-600 rounded-full px-5 py-2 flex items-center">
            <p class="text-zinc-100">{ @html $LL?.landing.exploreButton() }</p>

            <!-- @todo add icon -->
        </button>
    </div>

    <!-- Scrolling images -->
</section>