//import { PrismaClient } from "@prisma/client";

// declare global {
//     var prisma: PrismaClient | undefined;
// }

// //  export const prisma = global.prisma || new PrismaClient();

//  if (process.env.NODE != "production") global.prisma = prisma;

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default prisma