import { config } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';

import keystoneConfig from './config';
import { sendPasswordResetEmail } from './lib/mail';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  passwordResetLink: {
    async sendToken({ token, identity }) {
      await sendPasswordResetEmail(token, identity)
    }
  }
});

// @ts-ignore
export default withAuth(config(keystoneConfig));
