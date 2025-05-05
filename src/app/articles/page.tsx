"use client";
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

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await getArticles();
      const articles = data.articles;
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
    <div className="space-y-12 pt-8 md:pt-16">
      <AnimateFadeInUp>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          文章
        </h1>
      </AnimateFadeInUp>
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
                tag={article.tags.map((tag) => tag.name)}
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
