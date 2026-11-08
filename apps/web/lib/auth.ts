import { betterAuth } from "better-auth"
import { randomBytes } from "node:crypto"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const databaseUri = process.env.BETTER_AUTH_DB_URI
if (!databaseUri) {
  throw new Error("Missing BETTER_AUTH_DB_URI. Set it in the workspace root .env or apps/web/.env.local.")
}

const client = new MongoClient(databaseUri)
const db = client.db("hireloopdb")

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      userKey: {
        type: "string",
        required: true,
        input: false,
        returned: false,
        defaultValue: () => randomBytes(32).toString("hex"),
      },
    },
  },
      socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
  database: mongodbAdapter(db, {
    client,
  }),
  ...(process.env.NODE_ENV !== "production" && {
    onAPIError: {
      onError(error) {
        console.error("[Better Auth API error]", error)
      },
    },
  }),
})
