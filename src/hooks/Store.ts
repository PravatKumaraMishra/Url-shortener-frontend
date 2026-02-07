import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface TokenStore {
  token: string | null;
  isInitialized: boolean;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  isTokenValid: (token: string) => boolean;
  initializeToken: () => void;
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
  token: null,
  isInitialized: false,

  initializeToken: () => {
    try {
      const storedToken = JSON.parse(
        localStorage.getItem("JWT_TOKEN") || "null",
      );
      const validToken =
        storedToken && !isTokenExpired(storedToken) ? storedToken : null;
      set({ token: validToken, isInitialized: true });
    } catch {
      set({ token: null, isInitialized: true });
    }
  },

  setToken: (token) => {
    if (token && !isTokenExpired(token)) {
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
