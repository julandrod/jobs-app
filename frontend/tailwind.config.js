/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgBase: "var(--background-color)",
        secondaryBgBase: "var(--background-secondary-color)",
        primaryTextColor: "var(--text-color)",
        secondaryTextColor: "var(--text-secondary-color)",
        sidebarBg: "rgba(0, 0, 0, 0.7)",
        "primary-50": "#e0fcff",
        "primary-100": "#bef8fd",
        "primary-200": "#87eaf2",
        "primary-300": "#54d1db",
        "primary-400": "#38bec9",
        "primary-500": "#2cb1bc",
        "primary-600": "#14919b",
        "primary-700": "#0e7c86",
        "primary-800": "#0a6c74",
        "primary-900": "#044e54",
        "grey-50": "#f8fafc",
        "grey-100": "#f1f5f9",
        "grey-200": "#e2e8f0",
        "grey-300": "#cbd5e1",
        "grey-400": "#94a3b8",
        "grey-500": "#64748b",
        "grey-600": "#475569",
        "grey-700": "#334155",
        "grey-800": "#1e293b",
        "grey-900": "#0f172a",
        "custom-black": "#222",
        "red-light": "#f8d7da",
        "red-dark": "#842029",
        "green-light": "#d1e7dd",
        "green-dark": "#0f5132",
        statItemColor: {
          0: "#f59e0b",
          1: "#647acb",
          2: "#d66a6a",
        },
        statItemBg: {
          0: "#fef3c7",
          1: "#e0e8f9",
          2: "#ffeeee",
        },
      },
      width: {
        "fluid-width": "90vw",
      },
      maxWidth: {
        "max-width": "1120px",
        "fixed-width": "600px",
      },
      height: {
        "nav-height": "6rem",
      },
      boxShadow: {
        "shadow-1":
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "shadow-2":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "shadow-3":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "shadow-4":
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "shadow-nav": " 0 1px 0 0 rgba(0, 0, 0, 0.1)",
        "shadow-sidebar": "1px 0px 0px 0px rgba(0, 0, 0, 0.1)",
      },
      gridTemplateColumns: {
        "custom-grid": "auto 1fr",
      },
      transitionProperty: {
        "margin-left": "margin-left",
      },
      animation: {
        spinner: "spinner 0.6s linear infinite",
      },
      keyframes: {
        spinner: {
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
