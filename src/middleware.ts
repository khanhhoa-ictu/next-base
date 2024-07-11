import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl
    const token = request.cookies.get('token');

    if(pathname === '/about' &&  !token?.value){
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if(token?.value && (pathname === '/login' || pathname === '/register')){
      return NextResponse.redirect(new URL('/', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/register', '/about-me'],
}