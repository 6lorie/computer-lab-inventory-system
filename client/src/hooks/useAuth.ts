import { useEffect, useState } from "react";

import { getUser } from "../services/authStorage";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getUser();

    setUser(storedUser);

    setLoading(false);
  }, []);

  return { user, loading };
}