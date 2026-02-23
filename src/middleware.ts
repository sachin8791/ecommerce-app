import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/products',
    '/product/[slug]',
    '/api/auth/login',
    '/api/auth/register',
    '/api/products',
    '/api/categories',
  ];

  // Admin routes that require admin role
  const adminRoutes = [
    '/admin',
    '/admin/dashboard',
    '/admin/products',
    '/admin/orders',
    '/admin/users',
    '/api/admin',
  ];

  // Check if the path is public
  const isPublicRoute = publicRoutes.some(route => {
    if (route.includes('[')) {
      // Handle dynamic routes
      const routePattern = route.replace('[slug]', '[^/]+').replace('[id]', '[^/]+');
      return new RegExp(`^${routePattern}$`).test(pathname);
    }
    return pathname === route || pathname.startsWith(route + '/');
  });

  // Check if the path is admin route
  const isAdminRoute = adminRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // Get token from cookies or Authorization header
  const token = request.cookies.get('token')?.value || 
                request.headers.get('Authorization')?.replace('Bearer ', '');

  // If accessing protected routes without token, redirect to login
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If token exists, verify it
  if (token) {
    const decoded = verifyToken(token);
    
    // If token is invalid, redirect to login
    if (!decoded) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }

    // Check admin access
    if (isAdminRoute && decoded.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Add user info to request headers for API routes
    if (pathname.startsWith('/api')) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.userId);
      requestHeaders.set('x-user-email', decoded.email);
      requestHeaders.set('x-user-role', decoded.role);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
