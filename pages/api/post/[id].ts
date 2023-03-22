import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    console.log(id);
    try {
      const result = await prisma.post.findUnique({
        where: {
          id: id as string,
        },
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
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
