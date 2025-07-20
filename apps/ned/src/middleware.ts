import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse
} from 'next/server'
import { env } from '@/env'
const sansaUrl = env.NEXT_PUBLIC_SANSA_URL

const publicRoutes = [
  { path: '/', whenAuthenticated: 'redirect' },
  { path: '/register', whenAuthenticated: 'redirect' },
  { path: '/recover', whenAuthenticated: 'redirect' }
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path === path)
  const authToken = request.cookies.get('token')?.value

  console.log(
    '[Ned Middleware] path:',
    path,
    'authToken:',
    !!authToken,
    'publicRoute:',
    !!publicRoute
  )

  if (!authToken && publicRoute) {
    console.log('[Ned Middleware] Sem token, rota pública - permitindo')
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    console.log(
      '[Ned Middleware] Sem token, rota privada - redirecionando para /'
    )
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    console.log(
      '[Ned Middleware] Com token, rota pública - redirecionando para Sansa'
    )
    return NextResponse.redirect(sansaUrl)
  }

  if (authToken && !publicRoute) {
    console.log('[Ned Middleware] Com token, rota privada - permitindo')
    return NextResponse.next()
  }

  console.log('[Ned Middleware] Default - permitindo')
  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}
