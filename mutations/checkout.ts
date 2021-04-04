import type { GraphQLResolver } from '@keystone-next/types';

import type { OrderCreateInput } from '../.keystone/schema-types'
import type { Session } from '../types'
import stripe from '../lib/stripe';

const gql = String.raw

type Args = {
	token: string
}
type IProduct = {
	id: string
	name: string
	price: number
	description: string
	photo: {
		id: string
		image: {
			id: string
			publicUrlTransformed: string
		}
	}
}

type ICart = {
	id: string
	quantity: number
	product?: IProduct
}

type IUser = {
	id: string
	name: string
	email: string
	cart: ICart[]
}

const checkout: GraphQLResolver = async (_, { token }: Args, ctx): Promise<OrderCreateInput> => {
	const sesh = ctx.session as Session
	const userId = sesh?.itemId

	if (!userId) {
		throw new Error('You must be logged in to do this!')
	}

	const user: IUser = await ctx.lists.User.findOne({
		where: { id: userId },
		resolveFields: gql`
			id
			name
			email
			cart {
				id
				quantity
				product {
					id
					name
					price
					description
					photo {
						id
						image {
							id
							publicUrlTransformed
						}
					}
				}
			}
		`
	})

	const cartItems = user.cart.filter(item => item.product)
	const amount = cartItems.reduce((tally, item) => tally + item.product!.price, 0)

	const charge = await stripe.paymentIntents.create({
		amount,
		currency: 'USD',
		confirm: true,
		payment_method: token
	}).catch(err => {
		console.log(err);
		throw new Error(err.message)
	})

	const orderItems = cartItems.map(item => ({
		name: item.product!.name,
		description: item.product!.description,
		price: item.product!.price,
		quantity: item.quantity,
		photo: { connect: { id: item.product!.photo.id } },
	}))

	const order = await ctx.lists.Order.createOne({
		data: {
			total: charge.amount,
			charge: charge.id,
			items: { create: orderItems },
			user: { connect: { id: userId } }
		},
		resolveFields: false,
	});

	// Clean up any old cart item
	const cartItemIds = user.cart.map((item) => item.id);
	await ctx.lists.CartItem.deleteMany({
		ids: cartItemIds
	});

	return order;
}


export default checkout
