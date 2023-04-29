import { PrismaClient } from "@prisma/client/edge"
import useAccelerate from "@prisma/extension-accelerate"

export const prisma = new PrismaClient().$extends(useAccelerate)
