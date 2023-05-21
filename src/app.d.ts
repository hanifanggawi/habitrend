/* eslint-disable no-var */
// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from "@prisma/client";
import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit'
import type { AuthUser } from "@prisma/client";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			sb: TypedSupabaseClient,
			session: Session | null,
			auth: import("lucia-auth").AuthRequest;
		}
		// interface PageData {}
		// interface Platform {}
	}

	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type UserAttributes = Omit<AuthUser, 'id'>
	}

	var prisma: PrismaClient
}

export { };
