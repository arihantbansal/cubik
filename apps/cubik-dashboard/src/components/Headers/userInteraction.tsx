'use client';

import React from 'react';
import { useUser } from '@/context/user';

export const UserInteraction = () => {
  const { user } = useUser();
  return <div>{user?.username || 'default'}</div>;
};
