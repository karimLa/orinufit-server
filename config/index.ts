import type { KeystoneConfig } from '@keystone-next/types';
import { statelessSessions, withItemData } from '@keystone-next/keystone/session';

import { getDB, getSecret, getWebUrl } from '../utils/env';
import lists from '../schemas'
import { insertSeedData } from '../seed';

const keystoneConfig: KeystoneConfig = {
	server: {
		cors: {
			origin: [getWebUrl()],
			credentials: true
		}
	},
	db: {
		adapter: 'mongoose',
		url: getDB(),
		async onConnect(ctx) {
			if (process.argv.includes('--seed-data')) {
				await insertSeedData(ctx)
			}
		}
	},
	ui: {
		isAccessAllowed: (context) => !!context.session?.data
	},
	// @ts-ignore
	lists,
	// @ts-ignore
	session: withItemData(
		statelessSessions({
			maxAge: 60 * 60 * 24 * 30, // 30 days
			secret: getSecret(),
		}),
		{ User: 'name email' }
	)
}

export default keystoneConfig
