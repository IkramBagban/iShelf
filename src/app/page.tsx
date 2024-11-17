"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ThumbsUp, ThumbsDown, MessageCircle, Search } from "lucide-react";
import axios from "axios";

// Article Card Component
const ArticleCard = ({ title, description, id }) => {
  const reactArticle = async () => {
    const response = await axios.post(`/api/reaction/like?articleId=${id}`, {
      id,
    });
    console.log("response", response);
  };
  return (
    <Card className="border rounded-lg shadow-sm hover:shadow-md transition duration-200 ease-in-out">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          Updated on Nov 7, 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={reactArticle}
            >
              <ThumbsUp className="w-4 h-4" /> Like
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
            >
              <ThumbsDown className="w-4 h-4" /> Dislike
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" /> Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);

  // Fetch articles with pagination
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
      observer.observe(document.querySelector("#infinite-scroll-trigger")!);
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
