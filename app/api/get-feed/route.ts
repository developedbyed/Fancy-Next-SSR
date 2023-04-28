import { NextResponse, NextRequest } from "next/server"
import { prisma } from "../../../prisma/client"

export async function GET(req: NextRequest, res: NextResponse) {
  const start = performance.now()
  try {
    const end = performance.now()
    const timeTaken = end - start

    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: "asc" },
    })
    // retrieve data from your database
    return NextResponse.json(posts)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong ❣️" })
  }
}
