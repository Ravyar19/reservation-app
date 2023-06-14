import React, { useEffect, useState } from "react";
import logo from ".././logo2.png";
import Image from "next/image";
import fb from ".././facebook.png";
import insta from ".././instagram.png";

const Receipt = ({
  firstName,
  date,
  time,
  phoneNumber,
  timeFrom,
  timeTo,
  price,
  actuallPrice,
  type,
}) => {
  const [receiptNumber, setReceiptNumber] = useState(0);

  useEffect(() => {
    async function fetchReceiptNumber() {
      const response = await fetch("/api/getReceiptNumber");
      const data = await response.json();
      const receiptNumber = data.receiptNumber - 1;
      setReceiptNumber(receiptNumber.toString().padStart(4, "0"));
    }

    fetchReceiptNumber();
  }, []);
  return (
    <div>
      <div class="flex flex-col min-h-screen">
        <div class=" m-0 bg-black text-white p-3 flex justify-between">
          <div className="flex flex-col ml-10 justify-center items-start ">
            <div className="flex space-x-3">
              <Image src={fb} width={25} />
              <p className="font-bold">Oscar Hall</p>
            </div>{" "}
            <div className="flex space-x-3">
              <Image src={insta} width={25} />
              <p className="font-bold">Oscar___Hall</p>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center">
            <Image src={logo} width={150} />
            <p>ناونیشان- شەقامی گشتی سەرچنار</p>
          </div>
          <div
            className="flex flex-col
           items-center justify-center text-sm mr-10"
          >
            <p>07701489449</p>
            <p>07703505050</p>
          </div>
        </div>
        <div className="flex text-right flex-col mx-15 px-20 mt-5 ">
          <p className="font-bold ">
            ئامادەین بۆ هەموو بۆنە و ئاهەنگەکانتان بە باشترین شێوەی خزمەت
          </p>
          <p className="font-bold text-xl ">
            کۆنسێرت - ئاهەنگ - شەکراو - یادی لەدایک بوون - کۆنگرە - ئاهەنگی
            یەکترناسینی کۆلێژ و پەیمانگاکان - کۆڕ - کۆبونەوە
          </p>
        </div>
        <div class="flex justify-center items-center bg-white flex-grow flex-shrink mt-5">
          <div class="receipt-wrapper  bg-gray-100 rounded-lg shadow-md p-12">
            <div class="receipt text-center">
              <p class="mb-2 text-xl">
                <span class="font-semibold ">ژمارەی پسوڵە :</span>{" "}
                {receiptNumber}
              </p>

              <p class="mb-2 text-xl">
                <span class="font-semibold">ناو :</span> {firstName}
              </p>
              <p class="mb-2 text-xl">
                <span class="font-semibold">بۆ مەبەستی :</span> {type}
              </p>

              <p class="mb-2 text-xl">
                <span class="font-semibold ">ڕۆژ :</span> {date}
              </p>

              <p class="mb-2 text-xl">
                <span class="font-semibold"> ژمارەی تەلەفون :</span>{" "}
                {phoneNumber}
              </p>

              <p class="mb-2 text-xl">
                <span class="font-semibold">کات :</span> {timeFrom} - {timeTo}
              </p>
              <p class="mb-4 text-xl">
                <span class="font-semibold">نرخ :</span> {actuallPrice} (هەزار
                دینار)
              </p>
              <p class="mb-4 text-xl">
                <span class="font-semibold">پێشەکی :</span> {price} (هەزار
                دینار)
              </p>
              <hr class="mb-4" />
            </div>
          </div>
        </div>
        <div className="flex flex-col  text-right mx-15 px-20 mb-5">
          <h1 className="text-2xl mb-2 font-bold">:تێبینی</h1>

          <p className="font-bold">
            . ١- دەبێت پاشماوەی ئەو بڕە پارەی لاتان دەمێنێتەوە ڕۆژی ئاهەنگەکە
            بدرێ
          </p>
          <p className="font-bold">
            . ٢- قەرەبووکردنەوەی ئەو زەرەرو زیانەی کە لە کاتی ئاهەنگەکەدا
            ڕودەدات
          </p>
          <p className="font-bold">
            . ٣- وێنەگرتن بە کامێرای فۆتۆگراف تایبەتە بە هۆڵەکە. واتا کامێرای
            فۆتۆگراف قەدەغەیە
          </p>
          <p className="font-bold">
            . ٤- لەکاتی نەکردنی بۆنەکەدا پارە ناگەرێتەوە
          </p>
          <p className="font-bold"> . ٥- کامێرای ڤیدیۆ تایبەتە بەهۆڵەکە</p>
          <p className="font-bold mb-4"> . ٦- چەک بە هەموو شێوەیەک قەدەغەیە</p>
          <p className="font-bold text-xl ">
            {" "}
            ئێمە کە هۆڵەکەمان گرتووە پابەندین بەم مەرجانەی سەرەوە
          </p>
        </div>

        <div class="flex justify-between mx-15 px-20 items-center bg-white flex-grow flex-shrink ">
          <div className="mt-10">
            <p className="font-bold">: ئیدارەی هۆڵ</p>
            <p className="space-x-6 font-bold">
              <span>20</span> <span> / </span> <span> / </span>{" "}
            </p>
            <p></p>
          </div>
          <div className="mt-10 text-right">
            <p className="font-bold"> بە کرێ گر : {firstName} </p>
            <p className="font-bold"> {phoneNumber} : ژمارەی تەلەفون</p>
            <p className="font-bold">: واژۆ </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
