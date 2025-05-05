"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ListItemProps {
  type: "article" | "travel" | "project";
  title: string;
  description: string;
  date: string;
  href: string;
  imageUrl?: string;
  tag?: string | string[];
  readTime?: number;
}

const ListItem: React.FC<ListItemProps> = ({
  type,
  title,
  description,
  date,
  href,
  imageUrl,
  tag,
  readTime,
}) => {
  const isTravel = type === "travel" && imageUrl;

  // 处理tag可能是字符串或字符串数组的情况
  const tagArray = tag ? (Array.isArray(tag) ? tag : [tag]) : [];

  return (
    <Link href={href} className="block group">
      <article
        className={cn(
          "bg-gray-900/50 hover:bg-gray-800/70 border border-gray-800 rounded-lg p-6 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1",
          isTravel ? "grid grid-cols-1 md:grid-cols-3 gap-6 items-center" : ""
        )}
      >
        <div className={cn(isTravel ? "md:col-span-2" : "")}>
          <div className="flex items-center mb-3 space-x-3">
            {tagArray.length > 0 &&
              tagArray.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-600/20 text-green-400"
                >
                  {t}
                </span>
              ))}
            <h2 className="text-xl md:text-2xl font-semibold text-purple-400 group-hover:text-purple-300 transition-colors duration-200">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
            <span>{date}</span>
            {readTime && (
              <>
                <span>·</span>
                <span>{readTime} 分钟阅读</span>
              </>
            )}
          </div>
          <p className="text-base text-gray-300">{description}</p>
        </div>
        {isTravel && (
          <div className="relative aspect-video rounded-md overflow-hidden mt-4 md:mt-0 md:col-span-1">
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        )}
      </article>
    </Link>
  );
};

export default ListItem;
