import Container from "@/app/components/Container";
import OrderDetailsPageClient from "./pageClient";

interface OrderPageProps {
  params: { orderId: string } | Promise<{ orderId: string }>;
}

export default async function Order({ params }: OrderPageProps) {
  const { orderId } = await Promise.resolve(params);

  return (
    <div className="p-8">
      <Container>
        <OrderDetailsPageClient orderId={orderId} />
      </Container>
    </div>
  );
}
