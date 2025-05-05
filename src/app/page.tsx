"use client";
// import Image from "next/image"; // 不再需要，因为 Image 用在 ListItem 中
import { useEffect, useState } from "react";
import AnimateFadeInUp from "@/components/AnimateFadeInUp";
import { getArticles } from "@/api/article";
import ListItem from "@/components/ListItem";
import { Article } from "@/api/article";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data.articles);
      } catch (err) {
        setError("获取文章列表失败");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">加载中...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-400">加载失败</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <section className="text-center md:text-left pt-16 md:pt-24">
          <AnimateFadeInUp>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
              Hi, 我是 <span className="text-purple-400">Insomniac</span>,
              <br className="hidden md:block" />
              <span className="block mt-2 md:mt-0">一名软件工程师和摄影师</span>
            </h1>
          </AnimateFadeInUp>
        </section>
        <section className="space-y-8 mt-12">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <AnimateFadeInUp key={article.id} delay={`${index * 0.1 + 0.2}s`}>
                <ListItem
                  type="article"
                  title={article.title}
                  description={article.summary}
                  date={new Date(article.created_at).toLocaleDateString(
                    "zh-CN",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )}
                  href={`/details?id=${article.id}`}
                  imageUrl={article.cover_thumb}
                  tag={article.tags.map((t) => t.name)}
                  readTime={article.read_time}
                />
              </AnimateFadeInUp>
            ))
          ) : (
            <div className="text-center text-gray-400">暂无文章</div>
          )}
        </section>
      </div>
    </div>
  );
}

// 不再需要本地定义
// const AnimateFadeInUp: React.FC<...> = ...
