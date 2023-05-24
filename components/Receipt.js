import React from "react";
import logo from ".././logo2.png";
import Image from "next/image";
import fb from ".././facebook.png";
import insta from ".././instagram.png";

const Receipt = ({
  firstName,
  date,
  time,
  phoneNumber,
  receiptNumber,
  timeFrom,
  timeTo,
}) => {
  return (
    <div>
      <div class="flex flex-col min-h-screen">
        <div class="flex justify-between m-0 bg-black text-white p-3">
          <div></div>
          <div class="flex flex-col justify-center items-center">
            <Image src={logo} width={150} />
            <p>ناونیشان- شەقامی گشتی سەرچنار</p>
          </div>
          <div></div>
        </div>
        <div class="flex justify-center items-center bg-white flex-grow flex-shrink">
          <div class="receipt-wrapper p-4 bg-gray-100 rounded-lg shadow-md">
            <div class="receipt text-center">
              <h1 class="text-2xl font-bold mb-4">Reservation Receipt</h1>
              <p class="mb-2">
                <span class="font-semibold">ناو :</span> {firstName}
              </p>
              <p class="mb-2">
                <span class="font-semibold">ڕۆژ :</span> {date}
              </p>
              <p class="mb-2">
                <span class="font-semibold">کات :</span> {time}
              </p>
              <p class="mb-2">
                <span class="font-semibold"> ژمارەی تەلەفون :</span>{" "}
                {phoneNumber}
              </p>

              <p class="mb-4">
                <span class="font-semibold">کات :</span> {timeFrom} - {timeTo}
              </p>
              <hr class="mb-4" />
            </div>
          </div>
        </div>

        <div class="flex justify-between mx-15 px-20 items-center bg-white flex-grow flex-shrink ">
          <div>
            <p>: ئیدارەی هۆڵ</p>
            <p className="space-x-6">
              <span>20</span> <span> / </span> <span> / </span>{" "}
            </p>
            <p></p>
          </div>
          <div>
            <p>: واژۆ </p>
            <p>: بەکرێ گر</p>
            <p>: ژمارەی تەلەفون</p>
          </div>
        </div>
        <div class="flex justify-between m-0 bg-black text-white p-5">
          <div className="flex items-center flex-col justify-center">
            <p>07701489449</p>
            <p>07703505050</p>
          </div>
          <div class="flex flex-col justify-center items-center">
            <Image src={logo} width={150} />
          </div>
          <div class="flex justify-end">
            <div className="flex flex-col items-start justify-start space-y-2">
              <div className="flex space-x-3">
                <Image src={fb} width={25} />
                <p>Oscar Hall</p>
              </div>
              <div className="flex space-x-3">
                <Image src={insta} width={25} />
                <p>Oscar___Hall</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
