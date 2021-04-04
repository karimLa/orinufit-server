import { integer, relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { isSignedIn, rules } from "../config/access";

export const OrderItem = list({
	access: {
		// @ts-ignore
		create: isSignedIn,
		read: rules.canManageOrderItems,
		update: () => false,
		delete: () => false
	},
	fields: {
		name: text({ isRequired: true }),
		description: text({
			ui: {
				displayMode: 'textarea'
			}
		}),
		photo: relationship({
			ref: 'ProductImage',
			ui: {
				displayMode: 'cards',
				cardFields: ['image', 'altText'],
				inlineCreate: { fields: ['image', 'altText'] },
				inlineEdit: { fields: ['image', 'altText'] }
			}
		}),
		price: integer(),
		quantity: integer(),
		order: relationship({ ref: 'Order.items' })
	},
	ui: {
		listView: {
			initialColumns: ['name', 'photo', 'price', 'quantity']
		}
	}
})