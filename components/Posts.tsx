"use client"
import { AnimatePresence, motion } from "framer-motion"
import usePosts from "@/hook/usePosts"
import Post from "./Post"

const Posts = () => {
  const { data, isLoading, error } = usePosts()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong 😅</div>

  return (
    <motion.div className="my-12 flex  flex-col-reverse">
      <AnimatePresence>
        {data?.map((post) => (
          <Post post={post} key={post.layoutId} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
export default Posts
