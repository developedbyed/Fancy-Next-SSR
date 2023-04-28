import type { WebhookEvent } from "@clerk/clerk-sdk-node"
import { NextResponse, NextRequest } from "next/server"
import { prisma } from "../../../prisma/client"

export async function POST(req: NextRequest, res: NextResponse) {
  const { data, object, type }: WebhookEvent = await req.json()
  console.log(type)
  switch (type) {
    case "user.created":
      try {
        await prisma.user.create({
          data: {
            id: data.id,
            profile_image_url: data.profile_image_url,
            name: data.first_name,
          },
        })
      } catch (e) {
        console.log(e)
      }
    case "user.updated":
      try {
        await prisma.user.update({
          where: { id: data.id },
          data: {
            profile_image_url: data.profile_image_url,
            name: data.first_name,
          },
        })
      } catch (e) {
        console.log(e)
      }
  }
  return NextResponse.json({ event: type })
}
