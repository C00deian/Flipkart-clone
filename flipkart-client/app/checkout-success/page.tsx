"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { securedApi } from "@/app/lib/ClientUrlBase";
import type { Orders } from "@/app/types/OrderTypes";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Orders | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  const safeOrderId = useMemo(() => (orderId ? String(orderId) : null), [orderId]);

  useEffect(() => {
    if (!safeOrderId) return;

    let cancelled = false;
    let attempts = 0;

    const poll = async () => {
      attempts += 1;
      try {
        const res = await securedApi.get<Orders>(`/orders/${safeOrderId}`);
        if (cancelled) return;
        setOrder(res.data);
        setStatus("ready");

        // Webhook processing can be slightly delayed; poll briefly until paid.
        if (res.data.paymentStatus !== "SUCCESS" && attempts < 10) {
          setTimeout(poll, 1500);
        }
      } catch {
        if (cancelled) return;
        setStatus("error");
      }
    };

    poll();
    return () => {
      cancelled = true;
    };
  }, [safeOrderId]);

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">Checkout Complete</h1>
      <p className="mt-4">Order ID: {orderId}</p>

      {!safeOrderId && (
        <p className="mt-2 text-rose-600">Missing orderId in the success URL.</p>
      )}

      {status === "loading" && <p className="mt-2 text-slate-600">Checking payment status...</p>}

      {status === "error" && (
        <p className="mt-2 text-rose-600">
          Unable to fetch order status. If you are logged out, please sign in and check Orders.
        </p>
      )}

      {status === "ready" && order && (
        <p className="mt-2 text-slate-700">
          Payment status: <span className="font-semibold">{order.paymentStatus}</span>
        </p>
      )}
    </div>
  );
}
