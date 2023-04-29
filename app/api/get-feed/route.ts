import { NextResponse } from "next/server"
import { prisma } from "../../../prisma/client"

export const revalidate = 0

export async function GET(req: Request) {
  try {
    const { data, info } = await prisma.post
      .findMany({
        include: { author: true },
        orderBy: { createdAt: "asc" },
        cacheStrategy: { swr: 60, ttl: 60 },
      })
      .withAccelerateInfo()
    console.log(info)
    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong ❣️" })
  }
}
