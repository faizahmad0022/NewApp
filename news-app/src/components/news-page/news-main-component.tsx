
"use client";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { NewsCardComponent } from "@/components/news-page/newsComponent"
import { useState } from "react"

const newsData = [
  {
    id: "1",
    title: "Breaking: Major Technological Breakthrough in AI Research",
    description:
      "Scientists have announced a groundbreaking discovery in artificial intelligence that could revolutionize how machines learn and adapt to new situations.",
    image: "/futuristic-ai-technology-lab.jpg",
    likes: 1247,
    category: "Technology",
  },
  {
    id: "2",
    title: "Global Climate Summit Reaches Historic Agreement",
    description:
      "World leaders have come together to sign a comprehensive climate action plan aimed at reducing carbon emissions by 50% over the next decade.",
    image: "/world-leaders-climate-summit.jpg",
    likes: 892,
    category: "Environment",
  },
  {
    id: "3",
    title: "Stock Markets Hit Record Highs Amid Economic Recovery",
    description:
      "Major stock indices around the world have reached unprecedented levels as economies continue to bounce back from recent challenges.",
    image: "/stock-market-trading-floor.png",
    likes: 634,
    category: "Business",
  },
  {
    id: "4",
    title: "New Space Mission Discovers Potentially Habitable Exoplanet",
    description:
      "Astronomers have identified a planet in a distant solar system that shows promising signs of being able to support life as we know it.",
    image: "/exoplanet-space-telescope-view.jpg",
    likes: 2103,
    category: "Science",
  },
  {
    id: "5",
    title: "Revolutionary Medical Treatment Shows Promise in Clinical Trials",
    description:
      "A new therapeutic approach has demonstrated remarkable success in treating previously incurable diseases, offering hope to millions of patients worldwide.",
    image: "/medical-research-lab.png",
    likes: 1456,
    category: "Health",
  },
  {
    id: "6",
    title: "Championship Finals Draw Record-Breaking Viewership",
    description:
      "The highly anticipated sports championship has captivated audiences globally, with streaming numbers surpassing all previous records.",
    image: "/sports-championship-stadium.jpg",
    likes: 987,
    category: "Sports",
  },
]

export default function NewsMainComponent() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNews = newsData.filter((news) => {
    const query = searchQuery.toLowerCase()
    return (
      news.title.toLowerCase().includes(query) ||
      news.description.toLowerCase().includes(query) ||
      news.category.toLowerCase().includes(query)
    )
  })

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Latest News & Updates</h1>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            Stay informed with the most recent stories from around the world. Breaking news, analysis, and insights
            delivered to you.
          </p>
        </div>

        <div className="mb-8 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search news by keyword, title, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <NewsCardComponent key={news.id} {...news} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No news articles found matching "{searchQuery}"</p>
            <p className="text-sm text-muted-foreground mt-2">Try searching with different keywords</p>
          </div>
        )}
      </main>
    </div>
  )
}
