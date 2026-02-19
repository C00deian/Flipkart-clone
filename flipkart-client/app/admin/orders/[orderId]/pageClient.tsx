"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import NullData from "@/app/components/NullData";
import { AuthContext } from "@/app/context/AuthContext";
import type { Orders } from "@/app/types/OrderTypes";
import { getOrder } from "@/app/services/admin.service";
import OrderClient from "@/app/orders/OrderClient";

type Props = {
  orderId: string;
};

export default function AdminOrderPageClient({ orderId }: Props) {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [order, setOrder] = useState<Orders | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || auth.isLoading) return;
    if (!auth.currentUser) {
      router.push("/login");
      return;
    }
    if (auth.currentUser.role !== "ADMIN") {
      router.push("/");
      return;
    }

    setLoading(true);
    getOrder(orderId)
      .then((data) => setOrder(data))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [auth, orderId, router]);

  if (!auth || auth.isLoading) return <NullData title="Loading..." />;
  if (!auth.currentUser) return <NullData title="Redirecting..." />;
  if (auth.currentUser.role !== "ADMIN") return <NullData title="Oops! Access Denied" />;
  if (loading) return <NullData title="Loading order..." />;
  if (!order) return <NullData title="Order not found or access denied" />;

  return <OrderClient order={order} />;
}

