<script lang="ts">
    import {
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
    } from "@rgossiaux/svelte-headlessui";

    import { locale } from "$i18n/i18n-svelte";
	import { locales } from "$i18n/i18n-util";
	import { loadLocaleAsync } from "$i18n/i18n-util.async";
	import { replaceLocaleInUrl } from "../../../../../utils";
    import { page } from "$app/stores";
	import { goto, invalidateAll } from "$app/navigation";
	import type { Locales } from "$i18n/i18n-types";

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
}}>
    <ListboxButton class="rounded-full pr-5 bg-zinc-100 dark:bg-zinc-900">
        { $locale }
    </ListboxButton>

    <ListboxOptions>
        <div class="absolute mt-2 bg-zinc-900 rounded-xl p-4">
            {#each locales as locale}
                <ListboxOption value={locale} class="w-full rounded-full flex items-center">
                    <p class="py-2 text-zinc-300">{ locale }</p>
                </ListboxOption>
            {/each}
        </div>
    </ListboxOptions>
</Listbox>  