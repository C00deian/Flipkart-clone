export default function CheckoutPage() {
  // Checkout is currently initiated from the cart via `/checkout` API + Stripe redirect.
  // Keep this route as a valid Next.js page to avoid build/typecheck failures.
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <p className="mt-2 text-slate-600">
        Please start checkout from your cart.
      </p>
    </div>
  );
}
