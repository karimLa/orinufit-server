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
