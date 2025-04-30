import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // 可以添加自定义动画或颜色等
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
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
  plugins: [typography],
};
export default config;
