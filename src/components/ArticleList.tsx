import { useEffect, useState } from "react";
import { getArticles, Article } from "@/api/article";

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="article-list">
      {articles.map((article) => (
        <div key={article.id} className="article-item">
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          <div className="article-meta">
            <span>创建时间：{article.createTime}</span>
            <span>更新时间：{article.updateTime}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
