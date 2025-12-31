// apps/site-a/tailwind.config.cjs
const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "../../../packages/core/src/**/*.{html,js,svelte,ts}", // ✅ core 컴포넌트 스캔
  ],
  theme: {
    screens: {
      xs: '480px',   // 👈 커스텀
      sm: '640px',   // 기본
      md: '768px',   // 기본
      lg: '1024px',  // 기본
      xl: '1280px',  // 기본
      '2xl': '1536px',
    },
    extend: {},
  },
  plugins: [daisyui],
};
