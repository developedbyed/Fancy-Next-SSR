import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PostSubmit } from "@/types/PostSubmit"

const useSubmitPost = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ content, author, layoutId, id }: PostSubmit) => {
      const res = await fetch("/api/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, layoutId }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error)
      }

      return data
    },
    onMutate: async (newPost) => {
      console.log(newPost)
      await queryClient.cancelQueries(["posts"])
      const previousPosts = queryClient.getQueryData(["posts"])
      queryClient.setQueryData(["posts"], (old: any) => [...old, newPost])
      //Promise wait 250 ms
      await new Promise((resolve) => setTimeout(resolve, 350))
      return { previousPosts }
    },
    onError: (err, newPost, context: any) => {
      queryClient.setQueryData(["posts"], context.previousPosts)
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries(["posts"])
    },
  })
  return mutation
}

export default useSubmitPost
