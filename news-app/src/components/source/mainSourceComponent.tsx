"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SourceCardComponent } from "./sourceCardComponent";


export default function MainSourceComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();
      setNewsData(data.articles || []);
    } catch (err: any) {
      console.error("Error fetching news:", err);
      setError(err.message || "Something went wrong while fetching news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredNews = newsData.filter((news) => {
    const query = searchQuery.toLowerCase();
    return (
      news.title?.toLowerCase().includes(query) ||
      news.description?.toLowerCase().includes(query) ||
      news.source?.name?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-background">
      <main className="ml-10 px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Source News & Updates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            Stay informed with the latest Sources news from the US. Market updates, corporate news, and more.
          </p>
        </div>

        <div className="mb-8 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search news by keyword, title, or source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Loading news...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">
            <p>{error}</p>
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredNews.map((news, index) => (
              <SourceCardComponent  
                key={index}
                id={news.url || index.toString()}
                title={news.title}
                description={news.description}
                image={news.urlToImage || "/placeholder.png"}
                category={news.source?.name || "Business"}
                likes={0}
                url={news.url}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No news articles found matching "{searchQuery}"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try searching with different keywords
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
