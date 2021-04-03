import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";

import addToCart from "./addToCart";

const gql = String.raw

const extendGraphqlSchema = graphQLSchemaExtension({
	typeDefs: gql`
		type Mutation {
			addToCart(productId: ID): CartItem
		}
	`,
	resolvers: {
		Mutation: {
			addToCart,
		}
	}
})

export default extendGraphqlSchema
