"use client";

import { getArticleById } from "@/api/article";
import ArticleContent from "./ArticleContent";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Article } from "@/api/article";

interface ArticleDetailProps {
  id: string;
}

export default function ArticleDetail({ id }: ArticleDetailProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(id);
        setArticle(data.articles[0]);
      } catch (err) {
        setError("获取文章失败");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">加载中...</div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">文章不存在</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 文章头图 */}
      {article.cover_image && (
        <div className="relative w-full h-[400px] md:h-[500px]">
          <Image
            src={article.cover_image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* 文章标题 */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {article.title}
        </h1>

        {/* 文章元信息 */}
        <div className="flex items-center gap-4 text-gray-400 mb-8">
          <span>{article.author.Username}</span>
          <span>·</span>
          <span>
            {new Date(article.published_at).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
          <span>·</span>
          <span>{article.read_time} 分钟阅读</span>
        </div>

        {/* 文章标签 */}
        {article.tags.length > 0 && (
          <div className="flex gap-2 mb-8">
            {article.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm"
              >
                {tag.name || "未命名标签"}
              </span>
            ))}
          </div>
        )}

        {/* 文章内容 */}
        <ArticleContent content={article.content_md} />
      </div>
    </div>
  );
}
