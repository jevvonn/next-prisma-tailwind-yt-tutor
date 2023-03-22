import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../prisma/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({
        success: false,
        message: "Please sign in first.",
      });
    // Get User
    // Get Own Post
    try {
      const result = await prisma.user.findUnique({
        where: {
          email: session?.user?.email as string,
        },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              comments: true,
            },
          },
        },
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({
        success: false,
        message: "Error fetching post.",
      });
    }
  }
}
