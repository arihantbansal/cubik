import {
  createClient,
  SupabaseClient,
  UserResponse,
} from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { env } from "~/env.mjs";

export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const useUser = (client: SupabaseClient) => {
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
    client.auth.onAuthStateChange((event) => {
      fetchUser();
      event === "SIGNED_IN"
        ? setUser(user)
        : event === "SIGNED_OUT"
        ? setUser(null)
        : null;

      setIsLoading(false);
    });
  }, [client]);

  return { user, loading };
};

export { useUser };
