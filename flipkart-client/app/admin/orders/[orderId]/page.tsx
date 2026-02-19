import Container from "@/app/components/Container";
import AdminOrderPageClient from "./pageClient";

interface OrderPageProps {
  // Next.js can provide `params` as a Promise in newer versions.
  params: { orderId: string } | Promise<{ orderId: string }>;
}

export default async function AdminOrderPage({ params }: OrderPageProps) {
  const { orderId } = await Promise.resolve(params);

  return (
    <div className="p-8">
      <Container>
        <AdminOrderPageClient orderId={orderId} />
      </Container>
    </div>
  );
}

