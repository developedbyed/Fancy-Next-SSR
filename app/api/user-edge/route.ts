import type { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"

export const config = {
  runtime: "edge",
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const start = performance.now()
  const { userId } = getAuth(req)
  console.log(userId)
  if (!userId) {
    NextResponse.json({ error: "Unauthorized" })
    return
  }
  const end = performance.now()
  const timeTaken = end - start
  // retrieve data from your database
  return NextResponse.json({ userId, timeTaken })
}
