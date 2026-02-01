import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface TokenStore {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  isTokenValid: (token: string) => boolean;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp ? decoded.exp < currentTime : false;
  } catch {
    return true;
  }
};

const useTokenStore = create<TokenStore>((set) => ({
  token: (() => {
    const storedToken = JSON.parse(localStorage.getItem("JWT_TOKEN") || "null");
    return storedToken && !isTokenExpired(storedToken) ? storedToken : null;
  })(),

  setToken: (token) => {
    if (!isTokenExpired(token)) {
      localStorage.setItem("JWT_TOKEN", JSON.stringify(token));
      set({ token });
    } else {
      localStorage.removeItem("JWT_TOKEN");
      set({ token: null });
    }
  },

  clearToken: () => {
    localStorage.removeItem("JWT_TOKEN");
    set({ token: null });
  },

  isTokenValid: (token) => !isTokenExpired(token),
}));

export default useTokenStore;
