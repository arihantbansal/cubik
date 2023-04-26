import { getCsrfToken } from 'next-auth/react';

export const createMessage = async () => {
  const message = 'Hello World';
  const crsf = await getCsrfToken();
  const data = new TextEncoder().encode(message + '-' + crsf);

  return data;
};
