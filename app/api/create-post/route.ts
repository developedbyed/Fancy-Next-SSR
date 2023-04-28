import { NextResponse, NextRequest } from "next/server"
import { getAuth, clerkClient } from "@clerk/nextjs/server"
import { prisma } from "../../../prisma/client"

export async function POST(req: NextRequest, res: NextResponse) {
  const start = performance.now()

  try {
    const { userId } = getAuth(req)
    //Throw error if not logged
    if (!userId) {
      NextResponse.json({ error: "Please log in to post ❣️" }, { status: 401 })
      return
    }
    //Get Body Data
    const body = await req.json()

    //Check if body is empty
    if (body.content.length > 300) {
      return NextResponse.json(
        { error: "Please post a shorter message 🙏" },
        { status: 403, statusText: "Too short" }
      )
    }

    if (body.content.length < 1) {
      return NextResponse.json(
        { error: "Please post a longer message 🙏" },
        { status: 401 }
      )
    }

    const user = userId ? await clerkClient.users.getUser(userId) : null

    // const deleteAllPosts = await prisma.post.deleteMany({
    //   where: {
    //     authorId: userId,
    //   },
    // })

    const post = await prisma.post.create({
      data: {
        content: body.content,
        authorId: userId,
        layoutId: body.layoutId,
      },
    })
    // retrieve data from your database
    return NextResponse.json({ user, post })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong ❣️" })
  }
}
