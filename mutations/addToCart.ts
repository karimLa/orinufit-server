import type { GraphQLResolver } from '@keystone-next/types';

import type { CartItemCreateInput } from '../.keystone/schema-types'
import type { Session } from '../types'

type Args = {
	productId: string
}

const addToCart: GraphQLResolver = async (_, { productId }: Args, ctx): Promise<CartItemCreateInput> => {
	const sesh = ctx.session as Session

	if (!sesh?.itemId) {
		throw new Error('You must be logged in to do this!')
	}

	const cartItems = await ctx.lists.CartItem.findMany({
		where: {
			user: { id: sesh.itemId },
			product: { id: productId }
		},
		resolveFields: 'id,quantity'
	})

	const [existingCartItem] = cartItems

	if (existingCartItem) {
		return await ctx.lists.CartItem.updateOne({
			id: existingCartItem.id,
			data: { quantity: existingCartItem.quantity + 1 }
		})
	}

	return await ctx.lists.CartItem.createOne({
		data: {
			product: { connect: { id: productId } },
			user: { connect: { id: sesh.itemId } }
		}
	})
}


export default addToCart
