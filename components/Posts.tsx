"use client"
import { AnimatePresence, motion } from "framer-motion"
import usePosts from "@/hook/usePosts"
import Post from "./Post"

const Posts = () => {
  const { data, isLoading, error } = usePosts()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong 😅</div>
  console.log(data + "data from posts")
  return (
    <motion.div className="my-12 flex  flex-col-reverse">
      <AnimatePresence>
        {data?.map((post, index) => (
          <Post post={post} index={index} key={post.layoutId} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
export default Posts
