import type { Orders } from "@/app/types/OrderTypes";
import { OrderDetails } from "./OrderDetails";

export default function OrderClient({ order }: { order: Orders }) {
  // Access control is enforced by the backend (and gateway). This component only renders details.
  return <OrderDetails order={order} />;
}
