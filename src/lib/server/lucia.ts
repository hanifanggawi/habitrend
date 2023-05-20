// lib/server/lucia.ts

import lucia from "lucia-auth"
import { sveltekit } from "lucia-auth/middleware";
import prismaAdapter from "@lucia-auth/adapter-prisma" // Prisma adapter
import { dev } from "$app/environment"
import { prisma } from "$lib/server/prisma" // Prisma client
import { google } from "@lucia-auth/oauth/providers";
import { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private'

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

export const googleAuth = google(auth, {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: `${BASE_URL}/callback`,
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
})