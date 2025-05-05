"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getArticleById, Article } from "@/api/article";
import Image from "next/image";
import ArticleContent from "@/components/ArticleContent";

export default function DetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("未提供文章ID");
      setLoading(false);
      return;
    }
    setLoading(true);
    getArticleById(id)
      .then((data) => {
        if (!data || !data.article) {
          setError("未找到该文章");
        } else {
          setArticle(data.article as Article);
        }
      })
      .catch(() => setError("获取文章失败"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-400 py-12">加载中...</div>;
  }
  if (error) {
    return <div className="text-center text-red-400 py-12">{error}</div>;
  }
  if (!article) {
    return <div className="text-center text-gray-400 py-12">未找到该文章</div>;
  }

  return (
    <div className="min-h-screen text-white bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="mb-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            返回
          </button>
        </div>
        <div className="bg-gray-800/80 rounded-lg shadow-lg p-6">
          {article.cover_image && (
            <div className="relative w-full h-[200px] aspect-video rounded-md overflow-hidden mb-6">
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-purple-400 mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
            <span>作者：{article.author?.Username || "未知"}</span>
            <span>·</span>
            <span>
              {new Date(
                article.published_at || article.created_at
              ).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
            {article.read_time && (
              <>
                <span>·</span>
                <span>{article.read_time} 分钟阅读</span>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags?.map((tag) => (
              <span
                key={tag.id}
                className="inline-block px-3 py-0.5 rounded-full text-xs font-medium bg-green-600/20 text-green-400"
              >
                {tag.name || "未命名"}
              </span>
            ))}
          </div>
          <div className="prose prose-invert max-w-none">
            <ArticleContent content={article.content_md || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
