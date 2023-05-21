<script lang="ts">
	import LL, { locale } from "$i18n/i18n-svelte";
    import { i18nObject } from "$i18n/i18n-util";
    import { onDestroy } from "svelte";
	import { LanguagePicker } from "./LanguagePicker";
	import type { LocalizedString } from "typesafe-i18n";
	import type { TranslationFunctions } from "$i18n/i18n-types";

    const generateLinks = (locale: TranslationFunctions) => ([
        {
            title: locale.header.links.products(),
            link: "/ua/products",
        },
        {
            title: locale.header.links.recipes(),
            link: "/ua/recipes",
        },
        {
            title: locale.header.links.aboutUs(),
            link: "/ua/about",
        }
    ]);

    let links: Array<{ title: LocalizedString, link: string }> = generateLinks(i18nObject($locale));

    // Forcing svelte to update our links array
    const unsubscribe = locale.subscribe((locale) => {
        links = generateLinks(i18nObject(locale));
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
</script>

<!-- Header -->
<header class="fixed inset-x-0 top-0 w-full py-4 px-6 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 bg-opacity-50">
    <!-- Logotype -->
    <div class="md:w-1/6 flex items-center">
        <img src="https://em-content.zobj.net/thumbs/120/apple/354/shallow-pan-of-food_1f958.png" class="w-8 h-8" alt="">

        <span class="text-xl text-zinc-950 dark:text-zinc-100 ml-3">Snacktime</span>
    </div>

    <!-- Links -->
    <div class="hidden md:block rounded-full bg-zinc-100 dark:bg-zinc-900 px-5 py-2">
        { #each links as entry }
            <a href={ entry.link } class="text-zinc-600 dark:text-zinc-400 mx-4">{ entry.title }</a>
        { /each }
    </div>

    
    <!-- Login button -->
    <div class="md:w-1/6 flex gap-4 justify-end">
        <LanguagePicker />

        <button class="rounded-full px-5 py-2 bg-zinc-100 dark:bg-zinc-900">
            <p class="text-zinc-600 dark:text-zinc-400">{ $LL.header.signInButton() }</p>
        </button>
    </div>
</header>