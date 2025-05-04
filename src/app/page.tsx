"use client";
// import Image from "next/image"; // 不再需要，因为 Image 用在 ListItem 中
import { useEffect, useState } from "react";
import AnimateFadeInUp from "@/components/AnimateFadeInUp";
import { getArticles } from "@/api/article";
import ListItem from "@/components/ListItem";

interface Article {
  id: string;
  title: string;
  summary: string;
  tags: Array<{
    id: string;
    name: string;
  }>;
  read_time: number;
  created_at: string;
  cover_thumb: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await getArticles();
      const articles = data.articles;
      console.log("data======>>>", data);
      setArticles(articles as unknown as Article[]);
    } catch (error) {
      console.error("获取文章失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center md:text-left pt-16 md:pt-24">
        {/* 应用动画组件 */}
        <AnimateFadeInUp>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Hi, 我是 <span className="text-purple-400">Insomniac</span>,
            <br className="hidden md:block" />
            <span className="block mt-2 md:mt-0">一名软件工程师和摄影师</span>
          </h1>
        </AnimateFadeInUp>
      </section>

      {/* Content List Section */}
      <section className="space-y-8">
        {loading ? (
          <div className="text-center text-gray-400">加载中...</div>
        ) : articles.length > 0 ? (
          articles.map((article, index) => (
            <AnimateFadeInUp key={article.id} delay={`${index * 0.1 + 0.2}s`}>
              <ListItem
                type="article"
                title={article.title}
                description={article.summary}
                date={formatDate(article.created_at)}
                href={`/articles/${article.id}`}
                imageUrl={article.cover_thumb}
                tag={article.tags[0]?.name}
                readTime={article.read_time}
              />
            </AnimateFadeInUp>
          ))
        ) : (
          <div className="text-center text-gray-400">暂无文章</div>
        )}
      </section>
    </div>
  );
}

// 不再需要本地定义
// const AnimateFadeInUp: React.FC<...> = ...
