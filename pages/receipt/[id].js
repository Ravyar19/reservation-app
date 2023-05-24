import { useRouter } from "next/router";
import Receipt from "../../components/Receipt";

export default function ReceiptPage() {
  const router = useRouter();

  const {
    receiptNumber,
    firstName,
    date,
    time,
    phoneNumber,
    timeFrom,
    timeTo,
  } = router.query;

  console.log(timeFrom);

  return (
    <Receipt
      receiptNumber={receiptNumber}
      firstName={firstName}
      date={date}
      time={time}
      phoneNumber={phoneNumber}
      timeFrom={timeFrom}
      timeTo={timeTo}
    />
  );
}
