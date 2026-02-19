"use client"
import  { useContext, useEffect, useState } from 'react'
import Container from '@/app/components/Container';
import NullData from '@/app/components/NullData';
import { AuthContext } from '@/app/context/AuthContext';
import { getAllOrders } from '@/app/services/admin.service';
import toast from 'react-hot-toast';
import ManageOrdersClient from './ManageOrdersClient';
import { Orders } from '@/app/types/OrderTypes';


export const ManageOrders = () => {

  const auth = useContext(AuthContext);

  const [orders, setOrders] = useState<Orders[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!auth || auth.isLoading) return;
        if (!auth.currentUser || auth.currentUser.role !== "ADMIN") return;

        const res = await getAllOrders();
        setOrders(res);
      } catch (error) {
        console.error("Error fetching orders", error);
        toast.error("Failed to load orders");
      }
    };

    fetchOrders();
  }, [auth]);



  if (!auth || auth.isLoading) {
    return <NullData title="Loading..." />;
  }

  const { currentUser } = auth;

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access Denied" />;
  }
  
  return (
    <div className='pt-8'>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  )
}

export default ManageOrders;
