import Container from "@/app/components/Container"
import ProductDetails from "./ProductDetails"
import { ListRating } from "./ListRating"
import { getProductServer } from "@/app/services/product/server";

interface IPrams {
  params: Promise<{ productId: string }>;
}



const Product = async ({ params }: IPrams) => {

  const { productId } = await params;

  // const product = products.find((item) => item.id === productId)
  const product = await getProductServer(productId)
  console.log("single product", product);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20">
          <ListRating reviews={product.reviews} productId={productId} />
        </div>
      </Container>
    </div>
  )
}

export default Product
