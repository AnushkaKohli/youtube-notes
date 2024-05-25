// Without a defined matcher, all pages will require authentication.
export { default } from "next-auth/middleware";

// applies next-auth only to matching routes (e.g. /dashboard, /about)
// export const config = { matcher: ["/dashboard", "/about"] };
export const config = { matcher: ["/"] };
