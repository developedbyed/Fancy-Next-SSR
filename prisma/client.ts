import { PrismaClient } from "@prisma/client/edge"
import useAccelerate from "@prisma/extension-accelerate"

const prisma = new PrismaClient().$extends(useAccelerate)

export default prisma
