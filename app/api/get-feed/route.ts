import { NextResponse } from "next/server"
// import { prisma } from "../../../prisma/client"
import { PrismaClient } from "@prisma/client/edge"

export const runtime = "edge"
export const preferredRegion = "sfo"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong ❣️" })
  }
}
