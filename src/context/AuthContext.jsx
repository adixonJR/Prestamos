import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔐 AQUÍ VA TU useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token inválido");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setIsAuth(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuth(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ✅ Login
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuth(true);
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuth, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
