/* eslint-disable no-var */
// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from "@prisma/client";
import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			sb: TypedSupabaseClient,
			session: Session | null
		}
		interface PageData {
			session: import('@supabase/supabase-js').Session | null,
		}
		// interface Platform {}
	}
	var prisma: PrismaClient
}

export { };
