"use client";

import { getArticles } from "@/api/article";
import { useState, useEffect } from "react";
import ArticleDetail from "./ArticleDetail";
import { Article } from "@/api/article";

export default function ArticleList() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null
  );
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

  const handleBack = () => {
    setSelectedArticleId(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">加载中...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-400">加载失败</div>
        </div>
      </div>
    );
  }

  if (selectedArticleId) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={handleBack}
            className="mb-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            返回列表
          </button>
          <ArticleDetail id={selectedArticleId} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article: Article) => (
            <div
              key={article.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => setSelectedArticleId(article.id)}
            >
              {article.cover_image && (
                <div className="relative h-48">
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                <p className="text-gray-400 mb-4">{article.summary}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{article.author.Username}</span>
                  <span>·</span>
                  <span>
                    {new Date(article.published_at).toLocaleDateString(
                      "zh-CN",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )}
                  </span>
                  <span>·</span>
                  <span>{article.read_time} 分钟阅读</span>
                </div>
                {article.tags.length > 0 && (
                  <div className="flex gap-2 mt-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs"
                      >
                        {tag.name || "未命名标签"}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
