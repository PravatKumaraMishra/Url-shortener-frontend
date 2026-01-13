import { create } from "zustand";

interface TokenStore {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useTokenStore = create<TokenStore>((set) => ({
  token: JSON.parse(localStorage.getItem("JWT_TOKEN") || "null"),
  setToken: (token) => {
    localStorage.setItem("JWT_TOKEN", JSON.stringify(token));
    set({ token });
  },

  clearToken: () => {
    localStorage.removeItem("JWT_TOKEN");
    set({ token: null });
  },
}));

export default useTokenStore;
