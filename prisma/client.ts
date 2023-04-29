import { PrismaClient } from "@prisma/client"
import useAccelerate from "@prisma/extension-accelerate"

export const prisma = new PrismaClient().$extends(useAccelerate)
