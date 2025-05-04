import { get } from "@/utils/request";

// 定义文章接口返回的数据类型
export interface Article {
  id: number;
  title: string;
  content: string;
  createTime: string;
  updateTime: string;
  cover_thumb: string;
}

export interface ArticleList {
  articles: Article[];
  total: number;
}

// 获取文章列表
export const getArticles = () => {
  return get<ArticleList>("/articles");
};
