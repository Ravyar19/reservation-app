import { getSheetValues, updateSheetValues } from "../../sheets";

let lastReceiptNumber = 0;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { date, time, phoneNumber, firstName, sheetName } = req.body;

      const receiptNumber = Date.now().toString().slice(-4);

      const columnHeaderMapping = {
        morning: ["C", "D", "E"],
        afternoon: ["F", "G", "H"],
        evening: ["I", "J", "K"],
      };
      const columnHeader = columnHeaderMapping[time.toLowerCase()];
      if (!columnHeader) {
        res.status(400).json({ error: "Invalid time provided." });
        return;
      }

      // Find the row with the specified date
      const dateColumnRange = `'${sheetName}'!A1:A`;
      console.log(`Sheet name: ${sheetName}, Range: ${dateColumnRange}`);

      const dateValues = await getSheetValues(dateColumnRange);
      const rowIndex = dateValues.findIndex((row) => row[0] === date);

      if (rowIndex === -1) {
        res.status(404).json({ error: "Date not found." });
        return;
      }

      // Check if the specified time slot is already reserved
      const slotValues = await getSheetValues(
        `'${sheetName}'!${columnHeader[0]}${rowIndex + 1}:${columnHeader[2]}${
          rowIndex + 1
        }`
      );
      if (slotValues && slotValues[0].some((value) => value)) {
        res.status(400).json({ error: "Time slot already reserved." });
        return;
      }

      // Update the sheet with reservation details
      const updateRange = `'${sheetName}'!${columnHeader[0]}${rowIndex + 1}:${
        columnHeader[columnHeader.length - 1]
      }${rowIndex + 1}`;

      await updateSheetValues(updateRange, [
        [receiptNumber, firstName, phoneNumber],
      ]);

      res
        .status(200)
        .json({ message: "Reservation successfully created.", receiptNumber });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the reservation." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
