"use client"
import Image from "next/image"
import { motion } from "framer-motion"

type PostsType = {
  id: string
  content: string
  author: AuthorType
  createdAt: string
  layoutId: string
}

type AuthorType = {
  id: string
  name: string
  profile_image_url: string
}

const Post = ({ post, index }: { post: PostsType; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-gray-900 rounded-lg my-3"
      layoutId={post.layoutId}
      id={post.id}
    >
      <div className="flex items-center gap-4">
        <Image
          src={post.author ? post.author.profile_image_url : ""}
          width={48}
          height={48}
          alt="avatar"
          className="rounded-full"
        />
        <div>
          <h1 className="font-bold text-sm">{post.author?.name}</h1>
          <h1 className="font-medium">{post.content}</h1>
        </div>
      </div>
    </motion.div>
  )
}

export default Post
