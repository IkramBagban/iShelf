"use client";
import { AppSidebar } from "@/components/Comment";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";

const fetchArticle = async (
  id: number,
  setLoading: (isLoading: boolean) => void,
  setArticle: (article: any) => void
) => {
  setLoading(true);
  try {
    const response = await axios.get(`/api/articles?id=${id}`);
    if (response.status === 200) {
      const data = response.data.data;
      console.log("view article", data);
      setArticle(data);
    }
  } catch (error) {
    console.error("Error fetching article:", error);
  } finally {
    setLoading(false);
  }
};

const ViewArticle = () => {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("article_id");
    if (articleId) {
      fetchArticle(Number(articleId), setLoading, setArticle);
    }
  }, []);

  if (loading) {
    return <div className="text-center">Loading article...</div>;
  }

  if (!article) {
    return <div className="text-center">No article found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <SidebarProvider>
        <SidebarTrigger />
        <AppSidebar />

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-600 mb-4">{article.description}</p>
          <div className="border-t border-gray-300 pt-4">
            <p className="text-lg text-gray-800">{article.content}</p>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ViewArticle;
