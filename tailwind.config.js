/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 背景（主色）
        background: "#0D0D0D",
        // 主文字色
        "text-primary": "#E5E5E5",
        // 次文字色
        "text-secondary": "#9E9E9E",
        // 高亮 / 链接色
        highlight: "#7F5AF0",
        // hover 颜色
        hover: "#E53170",
        // 分割线 / 边框
        border: "#1A1A1A",
        // tag / 点缀色
        accent: "#00FFD1",
      },
      fontFamily: {
        // 正文字体
        body: [
          '"Source Han Sans"',
          '"HarmonyOS Sans"',
          "Inter",
          "Sora",
          '"Work Sans"',
          "sans-serif",
        ],
        // 标题字体
        heading: [
          '"ZCOOL XiaoWei"',
          '"Alibaba PuHuiTi"',
          '"Space Grotesk"',
          "Sora",
          "sans-serif",
        ],
        // 代码字体
        mono: ['"Noto Mono"', '"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
