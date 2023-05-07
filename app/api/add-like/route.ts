import { NextResponse, NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/app-beta"
import { prisma } from "../../../prisma/client"

export async function POST(req: NextRequest, res: NextResponse) {
  //test speed

  const start = Date.now()
  const body = await req.json()
  try {
    const { userId } = auth()
    //Throw error if not logged
    if (!userId) {
      NextResponse.json({ error: "Please log in to post ❣️" }, { status: 401 })
      return
    }
    const liked = await prisma.like.findFirst({
      where: {
        authorId: userId,
        postId: body.postId,
      },
    })

    if (!liked) {
      await prisma.$transaction([
        prisma.like.create({
          data: {
            authorId: userId,
            postId: body.postId,
          },
        }),
      ])
    } else {
      await prisma.$transaction([
        prisma.like.delete({
          where: {
            id: liked.id,
          },
        }),
      ])
    }
    const end = Date.now()
    console.log(`Time to add like: ${end - start}ms`)
    // retrieve data from your database
    return NextResponse.json("Liked 👍")
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong ❣️" })
  }
}
