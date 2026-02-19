'use client'

import { useState } from "react";
import { useCart } from "@/hooks/useCart"
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { Heading } from "../components/Heading";
import Button from "../components/Button";
import CartContent from "./CartContent";
import { formatePrice } from "../utils/formatePrice";
import { checkout } from "../services/checkout.service";


export const CartClient = () => {
    const { cartProducts, handleClearCart, cartTotalAmount,cartId } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div>
                    <div className="text-2xl">Your cart is empty</div>
                    <div className="">
                        <Link href={"/"}
                            className=" text-slate-500 flex items-center gap-1 mt-2" >
                            <MdArrowBack />
                            <span>Start Shopping</span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Heading
                title="Shopping Cart"
                center
            />
            <div className="
            grid
            grid-cols-5
            text-xs
            gap-4
            items-center
            mt-8
            mb-2
            ">
                <div className="col-span-2 justify-self-start">PRODUCT</div>
                <div className="justify-self-center">PRICE</div>
                <div className="justify-self-center">QUANTITY</div>
                <div className="justify-self-end">TOTAL</div>
            </div>

            <div>
                {cartProducts && cartProducts.map((item) => {
                    return <CartContent key={item.productId} item={item} />
                })}
            </div>
            <div className="flex  border-t-2 border-slate-200
            py-4 justify-between gap-4
            ">
                <div className="w-[90px]">
                    <Button label="Clear Cart" onClick={() => handleClearCart()} small outline />
                </div>
                <div className="flex text-sm flex-col gap-1 items-start">

                    <div className="flex justify-between w-full text-base font-semibold">
                        <span className="">Subtotal</span>
                        <span className="">{formatePrice(cartTotalAmount)}</span>
                    </div>

                    <p className=" text-slate-500">Taxes and shipping calculated at checkout</p>
                    <Button
                        label={isCheckingOut ? "Redirecting..." : "Checkout"}
                        disabled={isCheckingOut}
                        onClick={async () => {
                            if (!cartId) {
                                alert("Cart not found");
                                return;
                            }
                            if (isCheckingOut) return;
                            setIsCheckingOut(true);
                            try {
                                const { checkoutUrl } = await checkout(cartId);
                                window.location.href = checkoutUrl;
                            } finally {
                                // If Stripe redirect fails for some reason, allow retry.
                                setIsCheckingOut(false);
                            }
                        }}
                    />

                    <Link href={"/"}
                        className=" text-slate-500 flex items-center gap-1 mt-2" >
                        <MdArrowBack />
                        <span>Continue Shopping</span>
                    </Link>
                </div>

            </div>

        </div>
    )
}
