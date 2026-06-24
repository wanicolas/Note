import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);

  if (request.url.endsWith('/login')) {
    return next(request);
  }

  const token = localStorage.getItem('token');

  const requestWithHeader = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

  return next(requestWithHeader);
};
