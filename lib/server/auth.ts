import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { db } from "@/db";
import { user, account, session, verification } from "@/db/schema";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
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
  plugins: [expo()],
  trustedOrigins: ["myapp://", "http://", "exp://"],
});