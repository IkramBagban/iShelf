"use client";

import React, { useState } from "react";
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

// Article Card Component
const ArticleCard = ({ title, description }) => {
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
  const articles = [
    {
      title: "JavaScript Tips and Tricks",
      description:
        "Discover essential JavaScript tips to improve your coding skills and write more efficient code. Get insights on best practices...",
    },
    {
      title: "React Performance Optimization",
      description:
        "Learn how to optimize your React apps for better performance, including tips on memoization and code-splitting...",
    },
    {
      title: "CSS Grid vs Flexbox",
      description:
        "A comprehensive guide on when to use CSS Grid and Flexbox, with real-world examples and best practices...",
    },
    {
      title: "Web Development Trends 2024",
      description:
        "Stay ahead of the curve with the latest trends in web development for 2024, from AI integration to new frameworks...",
    },
    {
      title: "UI/UX Design Principles",
      description:
        "Explore the fundamental principles of UI/UX design to create more user-friendly and visually appealing interfaces...",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(query)
    );
    setFilteredArticles(filtered);
  };

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

      <div className="flex gap-6">
        {/* <aside className="flex flex-col bg-muted rounded-lg p-4 w-[20%] h-auto shadow-lg">
          <div className="space-y-4">
            <Badge variant="outline" className="w-full py-2 text-center">
              JavaScript
            </Badge>
            <Badge variant="outline" className="w-full py-2 text-center">
              Web Development
            </Badge>
            <Badge variant="outline" className="w-full py-2 text-center">
              UI/UX Design
            </Badge>
            <Badge variant="outline" className="w-full py-2 text-center">
              React.js
            </Badge>
          </div>
        </aside> */}

        <main className="flex flex-wrap gap-6 w-full">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <div key={index} className="w-full md:w-[45%] lg:w-[30%]">
                <ArticleCard
                  title={article.title}
                  description={article.description}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No articles found.</p>
          )}
        </main>
      </div>
    </div>
  );
}
