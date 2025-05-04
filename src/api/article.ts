import { get } from "@/utils/request";

// 定义文章接口返回的数据类型
export interface Article {
  id: string;
  title: string;
  content_md: string;
  summary: string;
  cover_image: string;
  cover_thumb: string;
  read_time: number;
  published_at: string;
  author_id: string;
  author: {
    id: string;
    CreatedAt: string;
    UpdatedAt: string;
    Username: string;
    Email: string;
    Phone: string;
    Password: string;
  };
  tags: Array<{
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface ArticleResponse {
  articles: Article[];
}

export interface ArticleByIdResponse {
  article: unknown;
}

// 获取文章列表
export const getArticles = () => {
  return get<ArticleResponse>("/articles");
};

// 获取单个文章
export const getArticleById = (id: string) => {
  return get<ArticleByIdResponse>(`/articles/${id}`);
};
