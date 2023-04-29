export const runtime = "edge"

import { NextResponse } from "next/server"
import { prisma } from "@/prisma/client"

export async function GET(req: Request) {
  const startTime = Date.now()
  try {
    const { data, info } = await prisma.post
      .findMany({
        include: { author: true },
        orderBy: { createdAt: "asc" },
        cacheStrategy: { swr: 2, ttl: 3 },
      })
      .withAccelerateInfo()
    console.log("Accelerate info:", info)
    console.log("Request took:", Date.now() - startTime, "ms")

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong ❣️" })
  }
}
