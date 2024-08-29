import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const publicPath = path == '/login' || path == '/send-code';
    const token = request.cookies.get('accessToken')?.value;


    if (publicPath && token) {
        return NextResponse.redirect(new URL('/product', request.nextUrl));
    }

    if (!publicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/img|.*\\.svg$).*)',
    ],
}
