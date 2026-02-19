// import { products } from "@/app/utils/products"
import Container from "./components/Container"
import HomeBanner from "./components/HomeBanner"
import ProductCard from "./components/products/ProductCard"
import NullData from "./components/NullData"
import ProductsClient from "./components/products/ProductsClient"
import Categories from "./components/nav/Categories"

export default async function Home() {
 
  return (
    <div className="bg-slate-200">
      <Container>
          {/* CATEGORIES BAR */}
   
          <Categories />
    
        <HomeBanner />
        
    
       <ProductsClient/>
      </Container>
    </div>
  )
}
