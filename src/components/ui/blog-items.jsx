"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Badge, Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card"
import Button from "../reusables/button"
import { formatDate } from "@/utils/formatDate"



export function BlogItem({ blog }) {
  const [isDeleted, setIsDeleted] = useState(false)

  const handleDelete = () => {
    // In a real application, you would call an API to delete the blog
    setIsDeleted(true)
  }

  if (isDeleted) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant={blog.isDraft ? "default" : "secondary"}>{blog.isDraft ? "Draft": "Published"}</Badge>
        <p className="mt-2 text-sm text-gray-500">Published on: {formatDate(blog.publishedAt)}</p>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="mr-2" size={16} />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

