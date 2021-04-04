import { list } from "@keystone-next/keystone/schema";
import { cloudinaryImage } from '@keystone-next/cloudinary'
import { relationship, text } from "@keystone-next/fields";

import { getCloudinaryCloudName, getCloudinaryKey, getCloudinarySecret } from "../utils/env";
import { isSignedIn, permissions } from "../config/access";

const cloudinary = {
	cloudName: getCloudinaryCloudName(),
	apiKey: getCloudinaryKey(),
	apiSecret: getCloudinarySecret(),
	folder: 'orinufit'
}

export const ProductImage = list({
	access: {
		// @ts-ignore
		create: isSignedIn,
		read: () => true,
		update: permissions.canManageProducts,
		delete: permissions.canManageProducts,
	},
	fields: {
		// @ts-ignore
		image: cloudinaryImage({
			cloudinary,
			label: 'Source',
			isRequired: true,
		}),
		altText: text(),
		product: relationship({ ref: 'Product.photo' }),
	},
	ui: {
		listView: {
			initialColumns: ['image', 'altText', 'product']
		}
	}
})