// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const publicRoutes = ["/", "/auth/signup"];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const cookieValue = request.cookies.get("isLoggedIn")?.value;
//   const isLoggedIn = cookieValue === "true";

//   if (isLoggedIn && publicRoutes.some(route => pathname.startsWith(route))) {
//     return NextResponse.redirect(new URL("/dashboard/news-page", request.url));
//   }

//   if (!isLoggedIn && pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/", "/auth/:path*"],
// };
