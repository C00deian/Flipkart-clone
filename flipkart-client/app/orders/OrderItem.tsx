
import React from 'react'
import { Items } from '../types/OrderTypes'
import Image from 'next/image'
import { truncateText } from '../utils/truncateText'
import { formatePrice } from '../utils/formatePrice'
import DummyImagePlaceHolder from '../components/DummyImagePlaceHolder'

interface OrderItemProps {
    item: Items
}

const OrderItem: React.FC<OrderItemProps> = ({
    item
}) => {
    return (
        <div className='grid grid-cols-5 text-xs md:text-sm gap-4 border-slate-200 py-4 items-center'>
            <div className='col-span-2 justify-self-start flex gap-2 md:gap-4'>

                <div className='relative w-[70px] aspect-square'>
                    {
                        item.productImage ? (<Image
                            src={item.productImage || "/placeholder.png"}
                            alt={item.productName}
                            fill
                            className='object-contain'
                        />) : (
                            <DummyImagePlaceHolder />
                        )
                    }



                </div>
                <div className='flex flex-col gap-1'>
                    <div>{truncateText(item.productName)}</div>
                    {/* <div>{item.productColor}</div> */}
                </div>
            </div>
            <div className='justify-self-center'>{formatePrice(item.unitPrice)}</div>
            <div className='justify-self-center'>{item.quantity}</div>
            <div className='justify-self-end font-semibold'>{formatePrice(item.totalPrice)}</div>

        </div>
    )
}

export default OrderItem