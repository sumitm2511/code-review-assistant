import { create } from "zustand";

export const useTheme = create((set) => ({
  theme: "dark",       // <-- default to dark
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));
