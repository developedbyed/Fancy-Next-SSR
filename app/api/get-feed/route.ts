import { NextResponse } from "next/server"
import { prisma } from "../../../prisma/client"

export const revalidate = 0
export const runtime = "edge"

export async function GET(req: Request) {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: "asc" },
      cacheStrategy: { swr: 3, ttl: 3 },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong ❣️" })
  }
}
