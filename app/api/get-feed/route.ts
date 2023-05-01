import { NextResponse } from "next/server"
import { prisma } from "../../../prisma/client"

export const runtime = "edge"
export const preferredRegion = "sfo1"

export async function GET(req: Request) {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: "asc" },
      cacheStrategy: { swr: 5, ttl: 10 },
    })

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong ❣️" })
  }
}
