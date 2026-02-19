"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NullData from "@/app/components/NullData";
import { AuthContext } from "@/app/context/AuthContext";
import Container from "@/app/components/Container";
import toast from "react-hot-toast";
import type { Orders } from "@/app/types/OrderTypes";
import { getMyOrders } from "@/app/services/order/service";
import OrdersClient from "./OrdersClient";

export default function OrdersPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [orders, setOrders] = useState<Orders[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!auth || auth.isLoading) return;

    if (!auth.currentUser) {
      router.push("/login");
      return;
    }

    if (auth.currentUser.role === "ADMIN") {
      router.push("/admin/manage-orders");
      return;
    }

    setIsFetching(true);
    getMyOrders()
      .then((res) => setOrders(res))
      .catch((error) => {
        console.error("Error fetching orders", error);
        toast.error("Failed to load orders");
      })
      .finally(() => setIsFetching(false));
  }, [auth, router]);

  if (!auth || auth.isLoading) return <NullData title="Loading..." />;
  if (!auth.currentUser) return <NullData title="Redirecting..." />;
  if (auth.currentUser.role === "ADMIN") return <NullData title="Redirecting..." />;
  if (isFetching) return <NullData title="Loading orders..." />;

  return (
    <div className="pt-8">
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
}
