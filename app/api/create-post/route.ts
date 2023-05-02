import { NextResponse, NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/app-beta"
import { prisma } from "../../../prisma/client"

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { userId, user } = auth()
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
        { status: 403 }
      )
    }

    const { author } = body
    const post = await prisma.post.create({
      data: {
        content: body.content,
        authorId: userId,
        layoutId: body.layoutId,
      },
    })
    // retrieve data from your database
    return NextResponse.json({ user, post, author })
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong ❣️" })
  }
}
