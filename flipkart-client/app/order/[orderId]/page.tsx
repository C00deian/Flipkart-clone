import { redirect } from "next/navigation";

interface OrderAliasPageProps {
  params: { orderId: string } | Promise<{ orderId: string }>;
}

export default async function OrderAliasPage({ params }: OrderAliasPageProps) {
  const { orderId } = await Promise.resolve(params);
  redirect(`/orders/${orderId}`);
}
