import { createContext, useEffect, useState } from "react";
import { getMe, login, logout } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const data = await getMe();

        if (data?.user) {
          setUser(data.user);
        }

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    fetchUser();

  }, []);
  const handleLogin = async ({ email, password }) => {
    try {
      const data = await login({ email, password });

      if (data?.user) {
        setUser(data.user);
        return true;
      }

      const me = await getMe();

      if (me?.user) {
        setUser(me.user);
        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <AuthContext.Provider
      value={{
  user,
  setUser,
  loading,
  setLoading,
  handleLogin,
  handleLogout
}}
    >
      {children}
    </AuthContext.Provider>
  );
};