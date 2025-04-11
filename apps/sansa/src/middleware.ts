import {
  NextResponse,
  type MiddlewareConfig,
  type NextRequest
} from 'next/server'

import { env } from '@/env'

const publicRoutes = [
  { path: '/register', whenAuthenticated: 'redirect' },
  { path: '/pricing', whenAuthenticated: 'next' },
  { path: '/docs', whenAuthenticated: 'next' }
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = env.NEXT_PUBLIC_NED_URL

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path === path)
  const authToken = request.cookies.get('token')?.value

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    return NextResponse.redirect(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE)
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    return NextResponse.redirect('/')
  }

  if (authToken && !publicRoute) {
    // checar se o jwt nao exta expirado ele carrega a data de expiração
    // se sim pode remover o cookien e redirecionar para o login
    // ou revalidar mas revalidar nao é bom que é custoso
    return NextResponse.next()
  }

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
