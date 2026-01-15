import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const middleware = (req: NextRequest) => {
    const token = req.cookies.get("auth_token")?.value
    const isPrivateRoute = req.nextUrl.pathname.startsWith("/")

    if (isPrivateRoute && !token) return NextResponse.redirect(new URL("/", req.url))
    if (req.nextUrl.pathname === "/" && token) return NextResponse.redirect(new URL("/rh", req.url))

    return NextResponse.next()
}

export const config = { matcher: ["/", "/rh/:path*"] }