import getQueryClient from "./getQueryClient"
import Hydrate from "./QueryHydrate"
import { dehydrate } from "@tanstack/query-core"
import { prisma } from "../prisma/client"

import Posts from "@/components/Posts"
import PostForm from "@/components/PostForm"

export const revalidate = 0

export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["posts"], async () => {
    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: "asc" },
    })
    return posts
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <main>
      <Hydrate state={dehydratedState}>
        <PostForm />
        <Posts />
      </Hydrate>
    </main>
  )
}
