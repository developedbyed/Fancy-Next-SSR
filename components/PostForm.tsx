"use client"

import { useState, useEffect } from "react"
import { IoSendSharp } from "react-icons/io5"
import useSubmitPost from "@/hook/useSubmitPost"
import { useUser } from "@clerk/nextjs/app-beta/client"
import { motion } from "framer-motion"
import { shakeAnimation } from "@/animations/shakeAnimation"

const PostForm = () => {
  const [content, setContent] = useState("")
  const [postError, setPostError] = useState("")
  const [isShaking, setIsShaking] = useState(false)
  const { user } = useUser()
  const mutation = useSubmitPost()

  const submitPost = async () => {
    mutation.mutate({
      content,
      author: {
        name: user?.fullName,
        profile_image_url: user?.profileImageUrl,
        id: user?.id,
      },
      id: crypto.randomUUID(),
      layoutId: crypto.randomUUID(),
    })
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (mutation.isError) {
      const error = mutation.error as Error
      console.log(error)
      setPostError(error.message)
      setIsShaking(true)
      timeout = setTimeout(() => {
        setIsShaking(false)
      }, 500)
    }
    if (mutation.isSuccess) {
      setContent("")
      setPostError("")
    }
    // Cleanup function
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [mutation.isError, mutation.isSuccess])

  return (
    <motion.form
      animate={isShaking ? "shake" : "initial"}
      variants={shakeAnimation}
      className="bg-slate-800 p-8 relative rounded-lg"
      onSubmit={(e) => {
        e.preventDefault()
        submitPost()
      }}
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={`resize-none rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-800 w-full transition-colors duration-200 ease-in border-2 border-transparent focus:border-blue-600 ${
          postError && "placeholder-red-500"
        } `}
        placeholder={postError ? postError : "What's on your mind?"}
        rows={3}
        maxLength={300}
      />
      <div className="flex justify-end">
        <motion.button
          className="mt-2 "
          initial={{ opacity: 1, x: 0 }}
          animate={
            mutation.isLoading ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }
          }
          type="submit"
        >
          <IoSendSharp className="text-lg"></IoSendSharp>
        </motion.button>
      </div>
    </motion.form>
  )
}
export default PostForm
