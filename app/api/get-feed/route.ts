export const revalidate = 0
export const runtime = "edge"

import { NextResponse } from "next/server"
import { prisma } from "../../../prisma/client"

export async function GET(req: Request) {
  const startTime = Date.now()
  try {
    const posts = await prisma.post
      .findMany({
        include: { author: true },
        orderBy: { createdAt: "asc" },
        cacheStrategy: { swr: 1, ttl: 1 },
      })
      .withAccelerateInfo()

    console.log("Request took:", Date.now() - startTime, "ms")

    return NextResponse.json(posts)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong ❣️" })
  }
}
