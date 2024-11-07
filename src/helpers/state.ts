import { createState } from '@hookstate/core';

export const globalRefreshToken = createState('');

export const globalAccessToken = createState({ token: '', expiresAt: 0 });

export const errorState = createState({
  message: '',
  show: false,
});

export const successState = createState({
  message: '',
  show: false,
});
