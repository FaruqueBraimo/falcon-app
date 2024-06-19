import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { signIn, signUp } from "../actions/auth";
import { redirect } from "next/navigation";

type User = {
  name: string;
};

type registrationRequest = {
  username: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean | null;
  login: (data: registrationRequest) => Promise<void>;
  register: (data: registrationRequest) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [isAuthenticated, setAutenticated] = useState<boolean | null>(false);

  async function login({ username, password }: registrationRequest) {
    const { token }: any = await signIn({
      username,
      password,
    });

    setCookie(undefined, "falcon.token", token, {
      maxAge: 60 * 60 * 1,
    });

    if (token !== "" && token !== null && token !== undefined) {
      window.location.href = "/";
    }
  }

  async function register({ username, password }: registrationRequest) {
    await signUp({
      username,
      password,
    });
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}
