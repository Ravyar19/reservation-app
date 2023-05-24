import { useState } from "react";
import logo from "../logo2.png";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const timeRange = `(${fromTime} - ${toTime})`;
    const fullNameWithTime = `${firstName} ${timeRange} `;
    async function fetchReceiptNumber() {
      const response = await fetch("/api/getReceiptNumber");
      const data = await response.json();
      return data.receiptNumber;
    }

    const response = await fetch("/api/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        time,
        phoneNumber,
        firstName: fullNameWithTime,
        sheetName,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      const receiptNumber = await fetchReceiptNumber();
      console.log("recipt" + receiptNumber);
      // Display the receipt message to the user with receipt number
      const receiptMessage = `Reservation successful!\n\nThank you for choosing our service.\n\nName: ${fullNameWithTime}\nDate: ${date}\nTime: ${fromTime} - ${toTime}\nPhone number: ${phoneNumber}\nReceipt number: ${receiptNumber}`;
      setMessage(receiptMessage);

      // Create receipt HTML template with receipt number
      router.push(
        `/receipt/${receiptNumber}?firstName=${firstName}&date=${date}&time=${time}&phoneNumber=${phoneNumber}&timeFrom=${fromTime}&timeTo=${toTime}`
      );

      // Clear the form fields
      setDate("");
      setTime("");
      setPhoneNumber("");
      setFirstName("");
    } else {
      const errorData = await response.json();
      setMessage(` ${errorData.error}`);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {/* <h2>Create Reservation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Time:
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="">Select time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </label>
        <br />

        <br />
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Reservation</button>
      </form>
      {message && <p>{message}</p>} */}

      <form class="w-full max-w-lg" onSubmit={handleSubmit}>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:full px-3 mb-6 md:mb-0">
            <label
              class="block text-right uppercase tracking-wide text-gray-700 text-lg  mb-2"
              for="grid-first-name"
            >
              ناو
            </label>
            <input
              class="appearance-none text-right block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-1/2 px-3">
            <label
              class="block text-right uppercase tracking-wide text-gray-700 text-lg mb-2"
              for="grid-first-name"
            >
              کات (بۆ)
            </label>
            <input
              class="appearance-none text-right block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              required
            />
          </div>
          <div class="w-1/2 px-3">
            <label
              class="block text-right uppercase tracking-wide text-gray-700 text-lg mb-2"
              for="grid-first-name"
            >
              کات (لە)
            </label>
            <input
              class="appearance-none text-right block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-right text-gray-700 text-lg mb-2"
              for="grid-password"
            >
              ژمارەی تەلەفون
            </label>
            <input
              class="appearance-none block w-full text-right bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-1">
            <label
              class="block uppercase tracking-wide text-right text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              کات
            </label>
            <div class="relative">
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                class="block appearance-none w-full text-center bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option value="">Select time</option>
                <option value="بەیانیان">بەیانیان</option>
                <option value="ئێواران">ئێواران</option>
                <option value="شەوان">شەوان</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block text-right uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-1">
              ڕۆژ
              <input
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-2"
                id="grid-state"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              htmlFor="sheetName"
              class="block text-right uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-1"
            >
              مانگ
            </label>
            <select
              id="sheetName"
              name="sheetName"
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              required
              class="block  appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">--Select Sheet--</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(
                (sheetNumber) => (
                  <option key={sheetNumber} value={`Sheet${sheetNumber}`}>
                    {`Sheet${sheetNumber}`}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-gray-500 w-full mx-auto hover:bg-blue-700 mt-5 text-white font-bold py-2 px-4 rounded-full "
        >
          تۆمارکردن
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
