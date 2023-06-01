import { useRouter } from "next/router";
import Receipt from "../../components/Receipt";

export default function ReceiptPage() {
  const router = useRouter();

  return (
    <Receipt
      id={router.query.id}
      firstName={router.query.firstName}
      date={router.query.date}
      time={router.query.time}
      phoneNumber={router.query.phoneNumber}
      timeFrom={router.query.timeFrom}
      timeTo={router.query.timeTo}
      price={router.query.price}
      type={router.query.type}
    />
  );
}
