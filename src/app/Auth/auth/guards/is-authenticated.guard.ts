import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authservice=inject(AuthService);
  if(authservice.isLoggedIn())
    return true;
  else
  return false;
};
