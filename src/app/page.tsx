"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import axios from "axios";
import ArticleCard from "@/components/ArticleCard";
export default function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);

  console.log("articles", articles)
  const fetchArticles = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/articles?page=${page}&pageSize=20`
      );
      if (response.status === 200) {
        const data = response.data.data;
        setArticles((prev) => [...prev, ...data]);
        setFilteredArticles((prev) => [...prev, ...data]);

        if (data.length === 0) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) fetchArticles(page);
  }, [page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(query)
    );
    setFilteredArticles(filtered);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (observerRef.current) observerRef.current.disconnect();
    if (filteredArticles.length > 0) {
      const triggerElement = document.querySelector("#infinite-scroll-trigger");
      if (triggerElement) {
        observer.observe(triggerElement);
      }
    }

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [filteredArticles, hasMore, loading]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full md:w-[50%]"
        />
        <Button variant="outline">
          <Search className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-6 w-full">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div key={index} className="w-full md:w-[45%] lg:w-[30%]">
              <ArticleCard
                title={article.title}
                description={article.description}
                id={article.id}
                Reaction={(article.Reaction && article.Reaction[0]) || null}
                totalLikes={article.totalLikes}
                totalDislikes={article.totalDislikes}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No articles found.</p>
        )}
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {hasMore && <div id="infinite-scroll-trigger" className="h-10"></div>}

      {!hasMore && !loading && (
        <p className="text-center text-gray-500">No more articles to load.</p>
      )}
    </div>
  );
}
