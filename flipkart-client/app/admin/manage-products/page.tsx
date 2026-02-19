"use client"

import Container from '@/app/components/Container'
import { useContext} from 'react'
import ManageProductsClient from './ManageProductsClient'

import { AuthContext } from '@/app/context/AuthContext';
import NullData from '@/app/components/NullData'
import { useProducts } from '@/hooks/useProducts'

const ManageProducts = () => {

  const { products, loading } = useProducts();
  const auth = useContext(AuthContext);

 if (!auth || auth.isLoading) return <NullData title="please wait loading..."/>;

if (auth.currentUser?.role !== "ADMIN") {
  return <NullData title='OOps! Access denied'/>;
}

  return (
    <div className='pt-8'>
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  )
}

export default ManageProducts