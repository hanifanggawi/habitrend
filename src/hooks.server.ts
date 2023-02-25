import type { Handle } from "@sveltejs/kit";
import '$lib/database/supabase'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { sequence } from "@sveltejs/kit/hooks";

const loadSupabaseClient: Handle = async ({ event, resolve }) => {
  const { session, supabaseClient } = await getSupabase(event)
  event.locals.sb = supabaseClient
  event.locals.session = session

  return resolve(event)
}

const logger: Handle = async ({ event, resolve }) => {
  const requestStartTime = Date.now();
  const response = await resolve(event);

  console.log(
    new Date(requestStartTime).toISOString(),
    event.request.method,
    event.url.pathname,
    event.url.search,
    response.status,
    `(${Date.now() - requestStartTime}ms)`,
  );
  return response;
};

export const handle = sequence(
  logger,
  loadSupabaseClient
);