import { password, relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { permissions, rules } from "../config/access";

export const User = list({
	access: {
		create: () => true,
		read: rules.canManageUsers,
		update: rules.canManageUsers,
		delete: permissions.canManageUsers
	},
	ui: {
		listView: {
			initialColumns: ['name', 'email', 'role']
		},
		// @ts-ignore
		hideCreate: ctx => !permissions.canManageUsers(ctx),
		// @ts-ignore
		hideDelete: ctx => !permissions.canManageUsers(ctx)
	},
	fields: {
		name: text({ isRequired: true }),
		email: text({ isRequired: true, isUnique: true }),
		password: password(),
		cart: relationship({
			ref: 'CartItem.user',
			many: true,
			ui: {
				createView: { fieldMode: 'hidden' },
				itemView: { fieldMode: 'read' }
			}
		}),
		orders: relationship({ ref: 'Order.user', many: true }),
		role: relationship({
			ref: 'Role.assignedTo',
			access: {
				// @ts-ignore
				create: permissions.canManageUsers,
				// @ts-ignore
				update: permissions.canManageUsers
			}
		}),
		products: relationship({
			ref: 'Product.user',
			many: true
		})
	},
})
