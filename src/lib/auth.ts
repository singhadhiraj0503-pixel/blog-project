import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { schema } from "./db/schema";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    autoSignIn: false,
  },
  appName: "Blog Project",
  secret: process.env.BETTER_AUTH_SECRET || "BETTER_AUTH_SECRET",
  baseURL: process.env.BASE_URL,
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
    schema: {
      ...schema,
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
    },
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true, // Enable caching session in cookie (default: `false`)
      maxAge: 300, // 5 minutes
    },
    disableSessionRefresh: true, // Disable session refresh so that the session is not updated regardless of the `updateAge` option. (default: `false`)
    useSecureCookies: true,
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    defaultCookieAttributes: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  },
});
