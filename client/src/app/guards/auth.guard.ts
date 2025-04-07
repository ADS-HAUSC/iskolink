// Auth.guard.ts made with <3 by Jimwel L. Valdez (jimvdz). Copyright (c) 2025. All rights reserved.

import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (await authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/admin-login']);
    return false;
  }
};