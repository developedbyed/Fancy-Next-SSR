import { useQuery } from "@tanstack/react-query"
import { PostsType } from "@/types/PostsType"

const usePosts = () => {
  return useQuery<PostsType[]>({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("/api/get-feed")
        .then((res) => res.json())
        .catch((error) => {
          throw new Error(error.message)
        }),
  })
}

export default usePosts
