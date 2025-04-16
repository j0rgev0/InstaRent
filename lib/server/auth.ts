import { betterAuth } from 'better-auth'
import { expo } from '@better-auth/expo'
import { db } from '@/db'
import { user, account, session, verification } from '@/db/schema'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { username } from 'better-auth/plugins'
import { resend } from '@/utils/resend'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      account,
      session,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: 'InstaRent <instarent@resend.dev>',
        to: user.email,
        subject: 'Verify your email',
        text: `Click the link to verify your email: ${url}`
      })
    }
  },
  plugins: [
    expo(),
    username({
      maxUsernameLength: 65,
      minUsernameLength: 2,
      usernameValidator: (username) => {
        if (username === 'admin') {
          return false
        }
        return true
      }
    })
  ],
  trustedOrigins: ['myapp://', 'http://', 'exp://'],
  session: {
    expiresIn: 60 * 60 * 24 * 3, // 3 days
    updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
  },
});
