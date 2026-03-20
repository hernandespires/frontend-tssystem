import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const middleware = (req: NextRequest) => {
    const { pathname } = req.nextUrl

    const isAuthenticated =
        req.cookies.has("next-auth.session-token") ||
        req.cookies.has("__Secure-next-auth.session-token") ||
        req.cookies.has("auth_token")

    const isLoginPage = pathname.startsWith("/login")
    const isApiRoute = pathname.startsWith("/api")

    if (pathname === "/") {
        return NextResponse.redirect(
            new URL(isAuthenticated ? "/comercial" : "/login", req.url)
        )
    }

    if (!isAuthenticated && !isLoginPage && !isApiRoute) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    if (isAuthenticated && isLoginPage) {
        return NextResponse.redirect(new URL("/comercial", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.webp$|.*\\.png$|.*\\.svg$|.*\\.ico$).*)"]
}
