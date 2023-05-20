import { redirect, type Handle } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import { sequence } from "@sveltejs/kit/hooks";

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

const authMiddleware: Handle = async ({ event, resolve }) => {
  event.locals.auth = auth.handleRequest(event);
  const publicRoutes = ['/login', '/register', '/callback']
  const path = event.url.pathname
  if (path != '/' && !publicRoutes.some(routePrefix => path.startsWith(routePrefix))) {
    const session = await event.locals.auth.validate()
    if (!session) {
      throw redirect(302, '/')
    }
  }
  return await resolve(event);
};

export const handle = sequence(
  logger,
  authMiddleware,
);