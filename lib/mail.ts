import { createTransport, getTestMessageUrl } from 'nodemailer'

import { getMailHost, getMailKey, getMailPort, getMailUser, getWebUrl } from '../utils/env'

const MAIL_USER = getMailUser()
const WEB_URL = getWebUrl()

const transporter = createTransport({
	// @ts-ignore
	host: getMailHost(),
	port: parseInt(getMailPort(), 10),
	auth: {
		user: MAIL_USER,
		pass: getMailKey()
	}
})

function makeEmail(text: string) {
	return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>
      <p>😘, Wes Bos</p>
    </div>
  `;
}

export async function sendPasswordResetEmail(
	resetToken: string,
	to: string
): Promise<void> {
	const info = (await transporter.sendMail({
		to,
		from: 'support@orinufit.com',
		subject: 'Your password reset token!',
		html: makeEmail(`Your Password Reset Token is here!
      <a href="${WEB_URL}/reset?token=${resetToken}">Click Here to reset</a>
    `),
	}))

	if (MAIL_USER.includes('ethereal.email')) {
		console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
	}
}
