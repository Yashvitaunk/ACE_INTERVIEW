import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import {
  login,
  register,
  logout,
  getMe,
} from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const {
    user,
    setUser,
    loading,
    setLoading,
  } = context;

  const handleLogin = async ({
    email,
    password,
  }) => {
    setLoading(true);

    try {
      const data = await login({
        email,
        password,
      });

      console.log("LOGIN DATA:", data);

      if (!data || !data.user) {
        return false;
      }

      setUser(data.user);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({
    username,
    email,
    password,
  }) => {
    setLoading(true);

    try {
      const data = await register({
        username,
        email,
        password,
      });

      console.log("REGISTER DATA:", data);

      if (data?.user) {
        setUser(data.user);
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();

        console.log("GET ME DATA:", data);

        if (data?.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};