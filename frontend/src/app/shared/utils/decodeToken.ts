import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { getCookie } from './decodeCookie';

export default function decodeToken(token: string | null = null): any {
  if (!token) {
    const platform = inject(PLATFORM_ID);
    if (isPlatformBrowser(platform)) {
      token = getCookie('token');
    }
  }

  try {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    }
  } catch (error) {
    console.log(error);
    localStorage.removeItem('token');
  }
  return null;
}
