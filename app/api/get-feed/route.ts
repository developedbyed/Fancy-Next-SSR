export const runtime = "edge"

import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import useAccelerate from "@prisma/extension-accelerate"

const prisma = new PrismaClient().$extends(useAccelerate)

export async function GET(req: Request) {
  const startTime = Date.now()
  try {
    const posts = await prisma.post
      .findMany({
        include: { author: true },
        orderBy: { createdAt: "asc" },
        cacheStrategy: { swr: 2, ttl: 2 },
      })
      .withAccelerateInfo()

    console.log("Request took:", Date.now() - startTime, "ms")

    return NextResponse.json(posts)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong ❣️" })
  }
}
