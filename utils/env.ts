import dotenv from 'dotenv'
import { join } from 'path'

dotenv.config({ path: join(__dirname, '..', '.env.local') })

function checkEnv(env: string | undefined, name: string) {
	if (!env) {
		throw new Error(
			`Please define the ${name} environment variable inside .env.local`
		)
	}

	return env
}

export function getDB() {
	const env = process.env.DATABASE_URL
	return checkEnv(env, 'DATABASE_URL')
}

export function getSecret() {
	const env = process.env.SESSION_SECRET
	return checkEnv(env, 'SESSION_SECRET')
}

export function getWebUrl() {
	const env = process.env.WEB_URL
	return checkEnv(env, 'WEB_URL')
}

export function getCloudinaryCloudName() {
	const env = process.env.CLOUDINARY_CLOUD_NAME
	return checkEnv(env, 'CLOUDINARY_CLOUD_NAME')
}

export function getCloudinaryKey() {
	const env = process.env.CLOUDINARY_KEY
	return checkEnv(env, 'CLOUDINARY_KEY')
}

export function getCloudinarySecret() {
	const env = process.env.CLOUDINARY_SECRET
	return checkEnv(env, 'CLOUDINARY_SECRET')
}

export function getMailHost() {
	const env = process.env.MAIL_HOST
	return checkEnv(env, 'MAIL_HOST')
}

export function getMailPort() {
	const env = process.env.MAIL_PORT
	return checkEnv(env, 'MAIL_PORT')
}

export function getMailUser() {
	const env = process.env.MAIL_USER
	return checkEnv(env, 'MAIL_USER')
}

export function getMailKey() {
	const env = process.env.MAIL_PASS
	return checkEnv(env, 'MAIL_PASS')
}

export function getStripeKey() {
	const env = process.env.STRIPE_SECRET
	return checkEnv(env, 'STRIPE_SECRET')
}
