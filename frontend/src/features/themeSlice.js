import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTheme: JSON.parse(localStorage.getItem("theme")) || "light",
  showSidebar: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.activeTheme = state.activeTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", JSON.stringify(state.activeTheme));
      document
        .querySelector("html")
        .setAttribute("data-theme", state.activeTheme);
    },
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export const { toggleTheme, toggleSidebar } = themeSlice.actions;

export const selectThemeState = (state) => state.theme;

export default themeSlice.reducer;
