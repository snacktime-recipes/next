import type { Locales } from "$i18n/i18n-types";
import LanguageFlag from "./LanguageFlag.svelte";

import UAFlag from "./types/ua.svelte";
import ENFlag from "./types/en.svelte";

export const FlagIcon: Record<Locales, any> = {
    ua: UAFlag,
    en: ENFlag,
};

export { LanguageFlag};