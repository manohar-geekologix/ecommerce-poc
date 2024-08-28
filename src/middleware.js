import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const publicPath = path == '/';
    const token = request.cookies.get('token')?.value;

    // if (publicPath && token) {
    //     return NextResponse.redirect(new URL('/', request.nextUrl));
    // }

    // if (!publicPath && !token) {
    //     return NextResponse.redirect(new URL('/login', request.nextUrl));
    // }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/img|.*\\.svg$).*)',
    ],
}
