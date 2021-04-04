import { checkbox } from '@keystone-next/fields'

export const permissionFields = {
	canManageProducts: checkbox({
		defaultValue: false,
		label: 'User can update and delete any product',
	}),
	canSeeOtherUsers: checkbox({
		defaultValue: false,
		label: 'User can query other users',
	}),
	canManageUsers: checkbox({
		defaultValue: false,
		label: 'User can Edit other users',
	}),
	canManageRoles: checkbox({
		defaultValue: false,
		label: 'User can CRUD roles',
	}),
	canManageCart: checkbox({
		defaultValue: false,
		label: 'User can see and manage cart and cartItems',
	}),
	canManageOrders: checkbox({
		defaultValue: false,
		label: 'User can see and manage orders',
	}),
};

export type Permissions = keyof typeof permissionFields;

export const permissionsList = Object.keys(permissionFields) as Permissions[];
