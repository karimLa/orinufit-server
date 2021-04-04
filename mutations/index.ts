import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";

import addToCart from "./addToCart";
import checkout from './checkout'

const gql = String.raw

const extendGraphqlSchema = graphQLSchemaExtension({
	typeDefs: gql`
		type Mutation {
			addToCart(productId: ID): CartItem
			checkout(token: String!): Order
		}
	`,
	resolvers: {
		Mutation: {
			addToCart,
			checkout,
		}
	}
})

export default extendGraphqlSchema
