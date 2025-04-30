// import Image from "next/image"; // 不再需要，因为 Image 用在 ListItem 中
import ListItem from "@/components/ListItem";
import AnimateFadeInUp from "@/components/AnimateFadeInUp"; // 导入共享组件

// Mock Data
const mockItems = [
  {
    type: "article" as const,
    title: "理解 React Hooks",
    description: "深入探讨 React Hooks 的概念和用法",
    date: "2月15日",
    href: "/articles/react-hooks",
  },
  {
    type: "project" as const,
    title: "Node.js 流程控制台",
    description: "利用 Node.js 构建现代化命令行工具",
    date: "1月28日",
    href: "/projects/node-cli",
  },
  {
    type: "travel" as const,
    title: "日本山间小径",
    description: "沿着长野县的宁静山路徒步旅行",
    date: "1月9日",
    href: "/travel/japan-trails",
    imageUrl: "/placeholder-mountain.jpg", // 占位图片路径
    tag: "旅行",
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center md:text-left pt-16 md:pt-24">
        {/* 应用动画组件 */}
        <AnimateFadeInUp>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Hi, 我是 <span className="text-purple-400">Insomniac</span>,
            <br className="hidden md:block" />
            <span className="block mt-2 md:mt-0">一名前端工程师和摄影师</span>
          </h1>
        </AnimateFadeInUp>
      </section>

      {/* Content List Section */}
      <section className="space-y-8">
        {mockItems.map((item, index) => (
          <AnimateFadeInUp key={item.href} delay={`${index * 0.1 + 0.2}s`}>
            <ListItem {...item} />
          </AnimateFadeInUp>
        ))}
      </section>
    </div>
  );
}

// 不再需要本地定义
// const AnimateFadeInUp: React.FC<...> = ...
