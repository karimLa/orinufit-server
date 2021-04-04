import { relationship, text } from '@keystone-next/fields'
import { list } from '@keystone-next/keystone/schema'

import { permissions } from '../config/access'
import { permissionFields } from './fields'

export const Role = list({
	access: {
		// @ts-ignore
		create: permissions.canManageRoles,
		read: permissions.canManageRoles,
		update: permissions.canManageRoles,
		delete: permissions.canManageRoles,
	},
	ui: {
		// @ts-ignore
		hideCreate: ctx => !permissions.canManageRoles(ctx),
		// @ts-ignore
		hideDelete: ctx => !permissions.canManageRoles(ctx),
		// @ts-ignore
		isHidden: ctx => !permissions.canManageRoles(ctx)
	},
	fields: {
		name: text({ isRequired: true }),
		...permissionFields,
		assignedTo: relationship({
			ref: 'User.role',
			many: true,
			ui: {
				itemView: { fieldMode: 'read' }
			}
		})
	}
})
