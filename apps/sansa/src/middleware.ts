import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse
} from 'next/server'
import { env } from '@/env'

const publicRoutes = [
  { path: '/register', whenAuthenticated: 'redirect' },
  { path: '/pricing', whenAuthenticated: 'next' },
  { path: '/docs', whenAuthenticated: 'next' },
  { path: '/auth/callback', whenAuthenticated: 'next' } // Permitir callback sem auth
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = env.NEXT_PUBLIC_ARYA_URL

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path === path)
  const authToken = request.cookies.get('token')?.value

  console.log(
    '[Sansa Middleware] path:',
    path,
    'authToken:',
    !!authToken,
    'publicRoute:',
    !!publicRoute
  )

  if (!authToken && publicRoute) {
    console.log('[Sansa Middleware] Sem token, rota pública - permitindo')
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    console.log(
      '[Sansa Middleware] Sem token, rota privada - redirecionando para Arya'
    )
    return NextResponse.redirect(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE)
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    console.log(
      '[Sansa Middleware] Com token, rota pública, redirecionando para /'
    )
    return NextResponse.redirect('/')
  }

  if (authToken && !publicRoute) {
    console.log('[Sansa Middleware] Com token, rota privada - permitindo')
    return NextResponse.next()
  }

  console.log('[Sansa Middleware] Default - permitindo')
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
