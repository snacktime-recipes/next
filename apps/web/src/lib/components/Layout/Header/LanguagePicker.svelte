<script lang="ts">
    import {
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
    } from "@rgossiaux/svelte-headlessui";

    import ChevronDownIcon from "svelte-feather-icons/src/icons/ChevronDownIcon.svelte";
    import ChevronUpIcon from "svelte-feather-icons/src/icons/ChevronUpIcon.svelte";

    import { locale } from "$i18n/i18n-svelte";
	import { locales } from "$i18n/i18n-util";
	import { loadLocaleAsync } from "$i18n/i18n-util.async";
	import { replaceLocaleInUrl } from "$utils";
    import { page } from "$app/stores";
	import { goto, invalidateAll } from "$app/navigation";
	import type { Locales } from "$i18n/i18n-types";
	import { LanguageFlag } from "$lib/components";
	import { fade } from "svelte/transition";

    async function switchLocale(newLocale: Locales) {
        // Loading new locale into memory
        await loadLocaleAsync(newLocale);

        // Invalidating everything
        invalidateAll();
    };
</script>

<Listbox value={$locale} on:change={async (e) => {
    // Updating
    await switchLocale(e.detail);

    // Updating url
    goto(replaceLocaleInUrl($page.url, e.detail));
}} class="relative" let:open>
    <ListboxButton class="rounded-full h-full flex items-center px-5 bg-zinc-100 dark:bg-zinc-900">
        <p class="text-zinc-600 dark:text-zinc-400">{ $locale }</p>

        { #if open }
            <ChevronUpIcon class="ml-4 w-5 h-5 text-zinc-700 dark:text-zinc-300" />
        { :else }
            <ChevronDownIcon class="ml-4 w-5 h-5 text-zinc-700 dark:text-zinc-300" />
        { /if }
    </ListboxButton>

    <ListboxOptions>
        <div in:fade class="absolute mt-2 ml-[-50%] w-[150%] bg-zinc-900 rounded-xl px-2">
            {#each locales as locale}
                <ListboxOption value={locale} class="cursor-pointer my-2 bg-zinc-800 relative w-full rounded-full flex items-center">
                    <LanguageFlag lang={locale} class="h-8 rounded-full" />
                    
                    <p class="text-zinc-300 ml-2">{ locale }</p>
                </ListboxOption>
            {/each}
        </div>
    </ListboxOptions>
</Listbox>  