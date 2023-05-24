import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const filePath = path.join(process.cwd(), "receiptNumber.json");
      const fileData = fs.readFileSync(filePath, "utf8");
      const receiptData = JSON.parse(fileData);

      res.status(200).json({ receiptNumber: receiptData.current });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while getting the receipt number." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
