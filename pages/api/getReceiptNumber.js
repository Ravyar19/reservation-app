let receiptNumber = 0;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      res.status(200).json({ receiptNumber: receiptNumber });
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

export function incrementReceiptNumber() {
  receiptNumber++;
}
