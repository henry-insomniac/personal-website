"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface ArticleContentProps {
  content: string;
}

// 创建一个类型声明文件来解决 TypeScript 报错
declare module "react-markdown" {
  interface CodeComponentProps {
    node: unknown;
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
  }
}

// 添加类型定义
type CodeProps = {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
  [key: string]: unknown;
};

export default function ArticleContent({ content }: ArticleContentProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  return (
    <article className="prose prose-invert markdown-content prose-headings:text-purple-400 prose-a:text-blue-400 prose-strong:text-white prose-code:text-yellow-300 prose-pre:bg-transparent prose-pre:p-0 prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-4 prose-blockquote:italic prose-li:text-gray-300 max-w-none w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // @ts-expect-error ReactMarkdown组件类型定义问题
          code({ inline, className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || "");
            const code = String(children).replace(/\n$/, "");

            if (!inline && match) {
              return (
                <div className="relative group">
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="bg-gray-700 hover:bg-gray-600 text-xs text-white px-2 py-1 rounded"
                      onClick={() => {
                        navigator.clipboard.writeText(code);
                        setCopiedCode(code);
                        setTimeout(() => setCopiedCode(null), 2000);
                      }}
                    >
                      {copiedCode === code ? "已复制!" : "复制"}
                    </button>
                  </div>
                  <SyntaxHighlighter
                    language={match[1]}
                    style={atomDark}
                    customStyle={{
                      borderRadius: "0.375rem",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                    showLineNumbers={true}
                    wrapLines={true}
                    {...props}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
