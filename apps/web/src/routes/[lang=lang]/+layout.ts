import type { LayoutLoad } from './$types'
import type { Locales } from '$i18n/i18n-types'
import { loadNamespaceAsync } from '$i18n/i18n-util.async'
import { browser } from '$app/environment';
import { setLocale } from '$i18n/i18n-svelte';

export const load: LayoutLoad<{ locale: Locales }> = async ({ data: { locale } }) => {
	// Load namespace into memory
	await loadNamespaceAsync(locale, "landing")

	// Updating (if we can)
	if (browser) {
		setLocale(locale);
	};

	// Pass updated locale to the "rendering context"
	return { locale }
}