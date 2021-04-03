import { password, relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const User = list({
	ui: {
		listView: {
			initialColumns: ['name', 'email']
		}
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
		})
	},
})
