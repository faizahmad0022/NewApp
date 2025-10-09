"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CardSkeleton from "../skeleton/skeletonLoader";
import { DashboardComponent } from "./dashboardComponent";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "../ui/calendar";

// Debounce Hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const categories = [
  { label: "Sports", value: "sports" },
  { label: "Health", value: "health" },
  { label: "Science", value: "science" },
  { label: "Business", value: "business" },
  { label: "Technology", value: "technology" },
  { label: "Entertainment", value: "entertainment" },
];

export default function MainBussinesComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("business");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchNews = async (
    category: string,
    query: string,
    start?: Date,
    end?: Date
  ) => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      params.append("country", "us");
      params.append("category", category);
      if (query) params.append("q", query);
      if (start) params.append("from", start.toISOString());
      if (end) params.append("to", end.toISOString());
      params.append("apiKey", process.env.NEXT_PUBLIC_NEWS_API_KEY || "");
      const url = `https://newsapi.org/v2/top-headlines?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      setNewsData(data.articles || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong while fetching news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory, debouncedSearchQuery);
  }, [selectedCategory, debouncedSearchQuery]);

  const filteredNews = newsData.filter((news) => {
    let matchesDate = true;
    if (startDate || endDate) {
      const publishedDate = new Date(news.publishedAt);
      if (startDate && publishedDate < startDate) matchesDate = false;
      if (endDate && publishedDate > endDate) matchesDate = false;
    }
    return matchesDate;
  });

  return (
    <div className="bg-background">
      <main className="ml-10 px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 text-balance">
            Business News & Updates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty mb-4">
            Stay informed with the latest news from the US. Market updates, corporate news, and more.
          </p>

          <div className="flex gap-10 mb-8">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-card border border-gray-300 text-foreground">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    {startDate ? startDate.toDateString() : "Start Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    {endDate ? endDate.toDateString() : "End Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
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
        </div>

        {loading ? (
          <div className="text-center py-16">
            <CardSkeleton />
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">
            <p>{error}</p>
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredNews.map((news, index) => (
              <DashboardComponent
                key={index}
                id={news.url || index.toString()}
                title={news.title}
                description={news.description}
                image={news.urlToImage || "/placeholder.png"}
                category={news.source?.name || selectedCategory}
                likes={0}
                url={news.url}
                publishedAt={news.publishedAt}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No news articles found matching "{debouncedSearchQuery}"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try searching with different keywords or date range
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
