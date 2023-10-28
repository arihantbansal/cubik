/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { env } from '@/env.mjs';
import type { SupabaseClient, UserResponse } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const useUserSupabase = (client: SupabaseClient) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setIsLoading] = useState<boolean>(true);
  const fetchUser = async () => {
    const user = await client.auth.getUser();

    if (user) {
      setUser(user);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    client.auth.onAuthStateChange(async (event) => {
      await fetchUser();
      event === 'SIGNED_IN'
        ? setUser(user)
        : event === 'SIGNED_OUT'
        ? setUser(null)
        : null;

      setIsLoading(false);
    });
  }, [client]);

  return { user, loading };
};

export { useUserSupabase };
