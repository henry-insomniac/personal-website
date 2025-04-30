import React from "react";
import AnimateFadeInUp from "@/components/AnimateFadeInUp"; // 导入共享组件

// 不再需要本地定义
// const AnimateFadeInUp: React.FC<...> = ...

export default function AboutPage() {
  return (
    <div className="space-y-12 pt-8 md:pt-16">
      <AnimateFadeInUp delay="0s">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          关于我
        </h1>
      </AnimateFadeInUp>

      <div className="prose prose-invert prose-lg max-w-none space-y-6">
        <AnimateFadeInUp delay="0.2s">
          <p>
            你好！我是 Insomniac，一名热衷于构建用户友好、高性能 Web
            应用的前端工程师。 我喜欢探索新的技术，尤其是 React 生态系统和现代
            Web 开发工具。
          </p>
        </AnimateFadeInUp>
        <AnimateFadeInUp delay="0.3s">
          <p>除了编码，我喜欢用相机记录下那些难忘的瞬间。</p>
        </AnimateFadeInUp>
        <AnimateFadeInUp delay="0.4s">
          <p>
            这个网站是我分享技术见解、旅行故事和摄影作品的地方。
            希望能在这里与你交流！
          </p>
        </AnimateFadeInUp>
      </div>
    </div>
  );
}
