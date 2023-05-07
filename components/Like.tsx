"use client"

import useSubmitLike from "@/hook/useSubmitLike"
import { PostsType } from "@/types/PostsType"
import { useUser } from "@clerk/nextjs"
import { motion } from "framer-motion"
import UseAnimations from "react-useanimations"
import heart from "react-useanimations/lib/heart"
import { useState } from "react"

export default function Like({ post }: { post: PostsType }) {
  const mutation = useSubmitLike()
  const { user } = useUser()
  const userHasLiked = post.likes.some((like) => like.authorId === user?.id)
  const [checked, setChecked] = useState(true)
  return (
    <button
      disabled={mutation.isLoading}
      onClick={() => mutation.mutate(post.id)}
    >
      <motion.div className="flex items-center gap-1 justify-end ">
        {/* <AiFillHeart
          className={`${
            userHasLiked ? "text-red-700" : "text-slate-100"
          } text-xl transition-all `}
        /> */}
        <UseAnimations
          reverse={userHasLiked}
          animation={heart}
          strokeColor="red"
          fillColor="red"
        />
        <p className="text-sm font-bold">{post.likes?.length || 0}</p>
      </motion.div>
    </button>
  )
}
