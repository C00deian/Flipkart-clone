'use client'
import Button from "@/app/components/Button"
import { getProductRating } from "@/app/components/products/ProductCard"
import { ProductImage } from "@/app/components/products/ProductImage"
import SetColor from "@/app/components/products/SetColor"
import SetQuantity from "@/app/components/products/SetQuantity"
import { CartProductType, SelectedImageType } from "@/app/types/CartProductTypes"
import { useCart } from "@/hooks/useCart"
import { Rating } from "@mui/material"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { MdCheckCircle } from "react-icons/md"
import Horizontal from "@/app/components/Horizontal"
import { formatePrice } from "@/app/utils/formatePrice"
import RatingBadge from "@/app/components/products/RatingBadge"


interface ProductProps {
    product: any
}


const ProductDetails: React.FC<ProductProps> = ({ product }) => {

    const { handleAddProductToCart, cartProducts, cartTotalQty } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [cartProduct, setCartProduct] = useState<CartProductType>(

        {
            id: product.id,
            name: product.name,
            description: product.description,
            category: product.category,
            brand: product.brand,
            selectedImage: { ...product.images[0] },
            quantity: 1,
            price: product.price
        }
    );

    const router = useRouter();

    useEffect(() => {
        setIsProductInCart(false)
        if (cartProducts) {
            const existingIndex = cartProducts.findIndex((item) => item.productId === product.id);
            if (existingIndex > -1) {
                setIsProductInCart(true);
            }
        }
    }, [cartProducts])

    const handleColorSelect = useCallback(
        (value: SelectedImageType) => {
            setCartProduct((pre) => {
                return { ...pre, selectedImage: value }
            })
        },
        [cartProduct.selectedImage]
    );

    // console.log("cartProduct", cartProduct


    return (
        <div className="grid grid-cols-1
      md:grid-cols-2 gap-12
      ">
            <ProductImage
                cartProduct={cartProduct}
                product={product}
                handleColorSelect={handleColorSelect}
            />
            <div className="flex flex-col gap-1 text-slate-600 text-sm">
                <h2 className="text-xl text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <RatingBadge
                        rating={getProductRating(product)}
                        reviewCount={product.reviews.length}
                    />
                </div>
                <h2 className="text-2xl font-medium text-slate-700">{formatePrice(product.price)}</h2>
                <Horizontal />
                <div className="text-justify ">{product.description}</div>
                <Horizontal />
                <div>
                    <span className="font-semibold">CATEGORY : </span>
                    {product.categoryName}
                </div>
                <div>
                    <span className="font-semibold">BRAND : </span>
                    {product.brand}
                </div>
                <div
                    className={product.inStock ? "text-sky-400" : 'text-rose-400'}
                >
                    {product.inStock ? "In stock" : "Out of Stock"}
                </div>
                <Horizontal />
                {isProductInCart ? (
                    <>
                        <p className="mb-2 text-slate-500 flex items-center gap-1">

                            <MdCheckCircle className="text-teal-400" size={20} />
                            <span>Product added to cart</span>

                        </p>
                        <div className="max-w-[350px]">
                            <Button label="View Cart"
                                outline
                                onClick={() => {
                                    router.push("/cart");
                                }}

                            />
                        </div>
                    </>
                ) : (
                    <>
                        <SetColor
                            images={product.images}
                            cartProduct={cartProduct}
                            handleColorSelect={handleColorSelect}
                        />
                        <Horizontal />

                        <div className="max-w-[300px]">
                            <Button
                                label="Add to Cart"
                                onClick={() => { handleAddProductToCart(cartProduct) }}
                            />
                        </div>
                    </>
                )}


            </div>

        </div>
    )
}

export default ProductDetails