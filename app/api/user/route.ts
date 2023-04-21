import { NextResponse, NextRequest } from "next/server"
import { getAuth } from "@clerk/nextjs/server"

export async function GET(req: NextRequest, res: NextResponse) {
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
