import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../prisma/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({
        success: false,
        message: "Please sign in first.",
      });
    // dELTE Post
    try {
      const postId = req.body;
      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({
        success: false,
        message: "Error has occured while making a post.",
      });
    }
  }
}
