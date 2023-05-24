import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { locale, LL } }) => {
	return { locale }
}