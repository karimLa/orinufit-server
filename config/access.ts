import type { KeystoneContext } from '@keystone-next/types'
import { Permissions, permissionsList } from '../schemas/fields'

export function isSignedIn({ session }: KeystoneContext) {
	return !!session
}

const genetatedPermissions = Object.fromEntries(
	permissionsList.map(permission => [
		permission,
		({ session }: KeystoneContext) => !!session?.data.role?.[permission]
	])
)

export const permissions = {
	...genetatedPermissions,
	can: (permission: Permissions) => ({ session }: KeystoneContext) => !!session?.data.role?.[permission]
}

export const rules = {
	canManageProducts(ctx: KeystoneContext) {
		if (!isSignedIn(ctx)) return false

		if (permissions.canManageProducts(ctx)) return true

		return { user: { id: ctx.session.itemId } }
	},
	canReadProducts(ctx: KeystoneContext) {
		if (permissions.canManageProducts(ctx)) return true

		return { status: 'AVAILABLE' }
	},
	canOrder(ctx: KeystoneContext) {
		if (!isSignedIn(ctx)) return false

		if (permissions.canManageCart(ctx)) return true

		return { user: { id: ctx.session.itemId } }
	},
	canManageOrderItems(ctx: KeystoneContext) {
		if (!isSignedIn(ctx)) return false

		if (permissions.canManageProducts(ctx)) return true

		return { order: { user: { id: ctx.session.itemId } } }
	},
	canManageUsers(ctx: KeystoneContext) {
		if (!isSignedIn(ctx)) return false

		if (permissions.canManageUsers(ctx)) return true

		return { id: ctx.session.itemId }
	},
}
