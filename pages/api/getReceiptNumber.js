export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const receiptNumber = parseInt(process.env.RECEIPT_NUMBER);
      res.status(200).json({ receiptNumber });
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
