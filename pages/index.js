import { useState } from "react";
import logo from "../logo2.png";

export default function Home() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [sheetName, setSheetName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, time, phoneNumber, firstName, sheetName }),
    });

    if (response.ok) {
      const responseData = await response.json();
      const { message, receiptNumber } = responseData;

      // Display the receipt message to the user with receipt number
      const receiptMessage = `Reservation successful!\n\nThank you for choosing our service.\n\nName: ${firstName}\nDate: ${date}\nTime: ${time}\nPhone number: ${phoneNumber}\nReceipt number: ${receiptNumber}`;
      setMessage(receiptMessage);

      // Create receipt HTML template with receipt number
      const receiptHTML = `
      <html>
        <head>
          <title>Reservation Receipt</title>
          <style>
            /* Receipt styles */
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
            }
            .receipt-wrapper {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .receipt {
              margin: 20px auto;
              padding: 20px;
              max-width: 400px;
              border: 2px solid #000;
              border-radius: 10px;
              box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
            }
            .logo {
              text-align: center;
              margin-bottom: 20px;
            }
            .logo img {
              max-width: 100%;
              height: auto;
            }
            .receipt h1 {
              text-align: center;
              font-size: 1.5rem;
              margin-bottom: 20px;
            }
            .receipt p {
              font-size: 1.1rem;
              margin: 0 0 10px 0;
            }
            .receipt .label {
              font-weight: bold;
              display: inline-block;
              width: 120px;
            }
            .receipt hr {
              border: none;
              border-top: 1px solid #000;
              margin: 20px 0;
            }
            .receipt .thank-you {
              text-align: center;
              font-size: 1.2rem;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="receipt-wrapper">
            <div class="receipt">
          
              <h1>Reservation Receipt</h1>
              <p><span class="label">Name:</span> ${firstName}</p>
              <p><span class="label">Date:</span> ${date}</p>
              <p><span class="label">Time:</span> ${time}</p>
              <p><span class="label">Phone:</span> ${phoneNumber}</p>
              <p><span class="label">Receipt number:</span> ${receiptNumber}</p>
              <hr>
              <p class="thank-you">Thank you for choosing our service!</p>
            </div>
          </div>
        </body>
      </html>
    `;

      // Create new window with receipt HTML
      const receiptWindow = window.open("", "Receipt", "height=600,width=400");
      receiptWindow.document.write(receiptHTML);
      receiptWindow.document.close();

      // Trigger print dialog box
      receiptWindow.print();

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
                <option value="morning">بەیانیان</option>
                <option value="afternoon">ئێواران</option>
                <option value="evening">شەوان</option>
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
