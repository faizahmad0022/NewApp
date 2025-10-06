"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface NewsCardProps {
  id: string
  title: string
  description: string
  image: string
  likes: number
  category: string
}

export function NewsCardComponent({ id, title, description, image, likes: initialLikes, category }: NewsCardProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
      setIsLiked(false)
    } else {
      setLikes(likes + 1)
      setIsLiked(true)
    }
  }

  return (
    <Card className="group overflow-hidden border-border bg-card hover:border-accent/50 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-md bg-accent/90 px-2.5 py-1 text-xs font-medium text-accent-foreground">
            {category}
          </span>
        </div>
      </div>

      <CardContent className="p-5">
        <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2 text-balance">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{description}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-5 pt-0">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
        >
          <Heart className={`h-5 w-5 transition-all ${isLiked ? "fill-accent text-accent" : ""}`} />
          <span className={isLiked ? "text-accent font-medium" : ""}>{likes}</span>
        </button>

        <Button size="sm" variant="secondary" asChild>
          <Link href={`/news/${id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
