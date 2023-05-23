type Locales = import('$i18n/i18n-types').Locales
type TranslationFunctions = import('$i18n/i18n-types').TranslationFunctions

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locales,
			LL: TranslationFunctions,
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
