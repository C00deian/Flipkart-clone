// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
// import toast from "react-hot-toast";

// import { useCart } from "@/hooks/useCart";
// import CheckoutForm from "./CheckoutForm";
// import Button from "../components/Button";

// // Stripe public key
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// const CheckoutClient = () => {
//   const {
//     cartProducts,
//     paymentIntent,
//     handleSetPaymentIntent,
//   } = useCart();

//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const router = useRouter();

//   // Prevent duplicate API calls (React 18 strict mode)
//   const isRequestInProgress = useRef(false);

//   // Stripe Elements options
//   const options: StripeElementsOptions = {
//     clientSecret: clientSecret ?? "",
//     appearance: {
//       theme: "stripe",
//     },
//   };

//   // Handle payment success (from CheckoutForm)
//   const handleSetPaymentSuccess = useCallback((value: boolean) => {
//     setPaymentSuccess(value);
//   }, []);

//   useEffect(() => {
//     if (!cartProducts || cartProducts.length === 0) return;
//     if (isRequestInProgress.current) return;

//     const createPaymentIntent = async () => {
//       try {
//         isRequestInProgress.current = true;
//         setLoading(true);
//         setError(false);

//         const res = await fetch("/api/create-payment-intent", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             items: cartProducts,
//             payment_intent_id: paymentIntent,
//           }),
//         });

//         if (res.status === 401) {
//           toast.error("Please login to continue");
//           router.push("/login");
//           return;
//         }

//         if (!res.ok) {
//           throw new Error("Failed to create payment intent");
//         }

//         const data = await res.json();

//         if (data?.paymentIntent?.client_secret) {
//           setClientSecret(data.paymentIntent.client_secret);
//         }

//         if (!paymentIntent && data?.paymentIntent?.id) {
//           handleSetPaymentIntent(data.paymentIntent.id);
//         }
//       } catch (err) {
//         console.error(err);
//         setError(true);
//         toast.error("Something went wrong. Please try again.");
//       } finally {
//         setLoading(false);
//         isRequestInProgress.current = false;
//       }
//     };

//     createPaymentIntent();
//   }, [cartProducts]);

//   return (
//     <div className="w-full">
//       {clientSecret && cartProducts && !paymentSuccess && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm
//             clientSecret={clientSecret}
//             handleSetPaymentSuccess={handleSetPaymentSuccess}
//           />
//         </Elements>
//       )}

//       {loading && (
//         <div className="text-center">Loading Checkout...</div>
//       )}

//       {error && (
//         <div className="text-center text-rose-500">
//           Something went wrong...
//         </div>
//       )}

//       {paymentSuccess && (
//         <div className="flex items-center flex-col gap-4">
//           <div className="text-teal-500 text-center text-lg font-semibold">
//             Payment Success
//           </div>

//           <div className="max-w-[220px] w-full">
//             <Button
//               label="View Your Orders"
//               onClick={() => router.push("/order")}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CheckoutClient;
