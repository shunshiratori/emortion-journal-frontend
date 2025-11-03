"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import api from "../lib/api";
import type { LoginResponse } from "../types";

type AuthState = {
  username: string | null;
  token: string | null;
  loading: boolean;
};
type AuthCtx = AuthState & {
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    username:
      typeof window !== "undefined"
        ? localStorage.getItem("ej_username")
        : null,
    token:
      typeof window !== "undefined" ? localStorage.getItem("ej_token") : null,
    loading: false,
  });

  const login = async (username: string, password: string) => {
    setState((s) => ({ ...s, loading: true }));
    try {
      const res = await api.post<LoginResponse>("/api/login", {
        username,
        password,
      });
      localStorage.setItem("ej_token", res.data.token);
      localStorage.setItem("ej_username", res.data.username);
      setState({
        username: res.data.username,
        token: res.data.token,
        loading: false,
      });
    } finally {
      setState((s) => ({ ...s, loading: false }));
    }
  };

  const logout = () => {
    localStorage.removeItem("ej_token");
    localStorage.removeItem("ej_username");
    setState({ username: null, token: null, loading: false });
    location.assign("/login");
  };

  const value = useMemo(() => ({ ...state, login, logout }), [state]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
