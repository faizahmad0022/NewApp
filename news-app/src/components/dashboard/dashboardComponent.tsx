"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface NewsCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  likes: number;
  category: string;
  url: string;
  publishedAt: string;
}

export function DashboardComponent({
  id,
  title,
  description,
  image,
  likes: initialLikes,
  category,
  url,
  publishedAt,
}: NewsCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const hasValidImage = image && image.startsWith("http");

  return (
    <Card className="group overflow-hidden border-border bg-card hover:border-accent/50 transition-all duration-300 p-0 flex flex-col">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {hasValidImage ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground bg-gray-100">
            No Image Available
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-md bg-accent/90 px-2.5 py-1 text-xs font-medium text-accent-foreground">
            {category}
          </span>
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2 text-balance">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>

        {publishedAt && (
          <p className="mt-5 text-xs text-muted-foreground italic">
            Published:{""}
            {new Date(publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between p-5 pt-0">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
        >
          <Heart
            className={`h-5 w-5 transition-all ${
              isLiked ? "fill-accent text-accent" : ""
            }`}
          />
          <span className={isLiked ? "text-accent font-medium" : ""}>
            {likes}
          </span>
        </button>

        <Button size="sm" variant="secondary" asChild>
          <Link href={url} target="_blank" rel="noopener noreferrer">
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
