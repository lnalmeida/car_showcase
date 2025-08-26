import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/saved-vehicles(.*)",
  "/reservations(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const authResult = await auth();
  const {userId, redirectToSignIn} = authResult;

  if (!userId && isProtectedRoute(req)) {
    console.log(`Redirecionando para login: ${req.nextUrl.pathname}`);
    return redirectToSignIn();
  }

  console.log(`Permitindo acesso: ${req.nextUrl.pathname}`);
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
