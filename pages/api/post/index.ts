import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Get All Post
    try {
      const result = await prisma.post.findMany({
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
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
