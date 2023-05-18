// lib/server/lucia.ts

import lucia from "lucia-auth"
import { sveltekit } from "lucia-auth/middleware";
import prismaAdapter from "@lucia-auth/adapter-prisma" // Prisma adapter
import { dev } from "$app/environment"
import { prisma } from "$lib/server/prisma" // Prisma client

export const auth = lucia({
  adapter: prismaAdapter(prisma),
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),
  transformDatabaseUser: (userData) => {
    return {
      userId: userData.id,
      email: userData.email,
    }
  },
})

export type Auth = typeof auth

