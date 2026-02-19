"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import NullData from "@/app/components/NullData";
import { AuthContext } from "@/app/context/AuthContext";
import type { Orders } from "@/app/types/OrderTypes";
import { getMyOrder } from "@/app/services/order/service";
import OrderClient from "../OrderClient";

type Props = {
  orderId: string;
};

export default function OrderDetailsPageClient({ orderId }: Props) {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [order, setOrder] = useState<Orders | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);

  useEffect(() => {
    if (!auth || auth.isLoading) return;
    if (!auth.currentUser) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setErrorTitle(null);
    getMyOrder(orderId)
      .then((data) => setOrder(data))
      .catch((err: any) => {
        const status = err?.response?.status;
        if (status === 404) setErrorTitle("Order not found");
        else if (status === 403) setErrorTitle("Access denied");
        else setErrorTitle("Order not found or access denied");
        setOrder(null);
      })
      .finally(() => setLoading(false));
  }, [auth, orderId, router]);

  if (!auth || auth.isLoading) return <NullData title="Loading..." />;
  if (!auth.currentUser) return <NullData title="Redirecting..." />;
  if (loading) return <NullData title="Loading order..." />;
  if (!order) return <NullData title={errorTitle ?? "Order not found or access denied"} />;

  return <OrderClient order={order} />;
}

