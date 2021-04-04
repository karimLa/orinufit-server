import Stripe from 'stripe'

import { getStripeKey } from '../utils/env'

const stripe = new Stripe(getStripeKey(), {
	apiVersion: '2020-08-27'
})

export default stripe
