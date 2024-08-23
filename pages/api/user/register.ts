import { signUp } from "@/src/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await signUp(req.body, (status: boolean) => {
        if (status) {
          res.status(200).json({ status: "true", message: "success" });
        } else {
          res.status(400).json({ status: false, message: "failed" });
        }
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ status: false, message: "Method Not Allowed" });
  }
}
