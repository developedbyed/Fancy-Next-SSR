"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { PostsType } from "@/types/PostsType"
import Like from "../components/Like"

const Post = ({ post }: { post: PostsType }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-black-200 rounded-lg my-3"
      layoutId={post.layoutId}
    >
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={post.author.profile_image_url}
          width={48}
          height={48}
          alt="avatar"
          className="rounded-full"
        />
        <div>
          <h1 className="font-bold text-sm bg-gradient-to-r from-primary-color-100 to-primary-color-200 text-transparent bg-clip-text">
            {post.author.name}
          </h1>
          <h1 className="font-medium">{post.content}</h1>
        </div>
      </div>
      <Like post={post} />
    </motion.div>
  )
}

export default Post
