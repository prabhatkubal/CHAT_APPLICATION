import { NextResponse, NextRequest } from "next/server";
import { getPathFromUrl } from "./utils/getUrlDetails";
import { routeAllowedWithoutLogin } from "./constants/routeAllowedWithoutLogin";
import { Chat, Login } from "./constants/paths";

const middleware = async (req: NextRequest) => {
  const csrfToken = req?.cookies.get("csrfToken")?.value;
  const accessToken = req?.cookies.get("jwt")?.value;

  const url = getPathFromUrl(req.nextUrl.href);
  const isRouteAllowedWithoutLogin = routeAllowedWithoutLogin.includes(url);
  // console.log("#####################", req.nextUrl.href, url);
  if (req.method === "OPTIONS" || req.method === "HEAD") {
    return NextResponse.next();
  }

  if (!isRouteAllowedWithoutLogin) {
    if (accessToken) {
      return NextResponse.next(); // Proceed to the next middleware or handler
    } else {
      return NextResponse.redirect(new URL(Login, req.url)); // Redirect to the login page
    }
  } else {
    if (accessToken) {
      return NextResponse.redirect(new URL(Chat, req.url)); // Redirect to the login page
    } else {
      return NextResponse.next(); // Proceed to the next middleware or handler
    }
  }
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - url that start with /Common
     */
    "/((?!api|_next/static|_next/image|favicon.ico|Common).*)",
  ],
};
export default middleware;
