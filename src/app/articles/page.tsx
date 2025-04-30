import ListItem from "@/components/ListItem";
import AnimateFadeInUp from "@/components/AnimateFadeInUp";

// Mock Data for Articles (replace with actual data fetching later)
const mockArticles = [
  {
    type: "article" as const,
    title: "理解 React Hooks",
    description: "深入探讨 React Hooks 的概念和用法",
    date: "2月15日",
    href: "/articles/react-hooks",
  },
  {
    type: "article" as const,
    title: "Tailwind CSS 最佳实践",
    description: "如何在项目中高效使用 Tailwind CSS",
    date: "3月1日",
    href: "/articles/tailwind-best-practices",
  },
  {
    type: "article" as const,
    title: "Next.js App Router 详解",
    description: "探索 Next.js 新的 App Router 功能",
    date: "3月10日",
    href: "/articles/nextjs-app-router",
  },
];

export default function ArticlesPage() {
  return (
    <div className="space-y-12 pt-8 md:pt-16">
      <AnimateFadeInUp>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          文章
        </h1>
      </AnimateFadeInUp>
      <section className="space-y-8">
        {mockArticles.map((item, index) => (
          <AnimateFadeInUp key={item.href} delay={`${index * 0.1 + 0.2}s`}>
            <ListItem {...item} />
          </AnimateFadeInUp>
        ))}
      </section>
    </div>
  );
}
