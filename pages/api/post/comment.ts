import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../prisma/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({
        success: false,
        message: "Please sign in first.",
      });
    const title: string = req.body.data.title;
    const id: string = req.body.data.id;

    // Get User
    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });
    // Validate title
    if (title.length > 300)
      return res.status(403).json({
        success: false,
        message: "Please write shorter comment.",
      });
    if (!title.length)
      return res.status(403).json({
        success: false,
        message: "Please do not leave blank .",
      });
    // Create Post
    try {
      const result = await prisma.comment.create({
        data: {
          message: title,
          postId: id,
          userId: prismaUser?.id as string,
        },
      });
      res.status(200).json({
        success: true,
        result,
      });
    } catch (error) {
      res.status(403).json({
        success: false,
        message: "Error has occured while making a comment.",
      });
    }
  }
}
