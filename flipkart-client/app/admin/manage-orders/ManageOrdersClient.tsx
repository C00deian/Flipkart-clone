"use client"

import {Orders} from '@/app/types/OrderTypes';
import {formatePrice} from '@/app/utils/formatePrice';
import React, {useCallback} from 'react'
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Heading} from '@/app/components/Heading';
import {Status} from '@/app/components/Status';
import {MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye} from 'react-icons/md';
import ActionBtn from '@/app/components/ActionBtn';
import {useRouter} from 'next/navigation';
import moment from 'moment';
import toast from 'react-hot-toast';
import {deliverOrder, dispatchOrder} from '@/app/services/admin.service';

interface ManageOrdersProps {
    orders: Orders[]
}

const ManageOrdersClient: React.FC<ManageOrdersProps> = ({orders}) => {

    const router = useRouter();
    let rows: any = [];

    if (orders && Array.isArray(orders)) {
        rows = orders.map((odr) => {
            return {
                id: odr.id,
                customerId: odr.customerId,
                amount: formatePrice(odr.totalPrice),
                paymentStatus: odr.paymentStatus,
                orderStatus: odr.orderStatus,
                date: moment(odr.orderDate).fromNow(),
            };
        });
    }

    // --- API HANDLER: DISPATCH ---
    const handleDispatch = useCallback((id: string) => {
        const toastId = toast.loading("Dispatching order...");

        dispatchOrder(id)
            .then((res) => {
                toast.success("Order Dispatched", {id: toastId});
                router.refresh();
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to dispatch order", {id: toastId});
            });
    }, [router]);

    // --- API HANDLER: DELIVER ---
    const handleDeliver = useCallback((id: string) => {
        const toastId = toast.loading("Marking as Delivered...");

        deliverOrder(id)
            .then((res) => {
                toast.success("Order Delivered", {id: toastId});
                router.refresh();
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to deliver order", {id: toastId});
            });
    }, [router]);


    const columns: GridColDef[] = [
        {field: 'id', headerName: 'Order ID', width: 220},
        {field: 'customerId', headerName: 'Customer ID', width: 130},
        {
            field: 'amount',
            headerName: 'Amount (INR)',
            width: 130,
            renderCell: (params) => {
                return (
                    <div className='font-bold text-slate-800'>
                        {params.row.amount}
                    </div>
                )
            }
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            width: 130,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.paymentStatus === 'SUCCESS' ? (
                            <Status
                                text='Paid'
                                icon={MdDone}
                                bg='bg-green-200'
                                color='text-green-700'
                            />
                        ) : (
                            <Status
                                text='Pending'
                                icon={MdAccessTimeFilled}
                                bg='bg-rose-200'
                                color='text-rose-700'
                            />
                        )}
                    </div>
                )
            }
        },
        {
            field: 'orderStatus',
            headerName: 'Order Status',
            width: 130,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.orderStatus === 'DELIVERED' && (
                            <Status text='Delivered' icon={MdDone} bg='bg-green-200' color='text-green-700'/>
                        )}
                        {params.row.orderStatus === 'SHIPPED' && (
                            <Status text='Dispatched' icon={MdDeliveryDining} bg='bg-purple-200'
                                    color='text-purple-700'/>
                        )}
                        {(params.row.orderStatus === 'PLACED' || params.row.orderStatus === 'PLACED') && (
                            <Status text='Placed' icon={MdAccessTimeFilled} bg='bg-slate-200' color='text-slate-700'/>
                        )}
                    </div>
                )
            }
        },
        {field: 'date', headerName: 'Date', width: 130},
        {
            field: 'action',
            headerName: 'Actions',
            width: 180,
            renderCell: (params) => {
                return (
                    <div className='flex justify-between gap-4 w-full mt-2'>
                        {/* Dispatch Button */}
                        <ActionBtn
                            icon={MdDeliveryDining}
                            onClick={() => {
                                handleDispatch(params.row.id);
                            }}
                        />
                        {/* Deliver Button */}
                        <ActionBtn
                            icon={MdDone}
                            onClick={() => {
                                handleDeliver(params.row.id);
                            }}
                        />
                        {/* View Button */}
	                        <ActionBtn
	                            icon={MdRemoveRedEye}
	                            onClick={() => {
	                                router.push(`/admin/orders/${params.row.id}`);
	                            }}
	                        />
	                    </div>
	                )
	            },
        },
    ]

    return (
        <div className='max-w-[1150px] m-auto text-xl'>
            <div className='mb-4 mt-8'>
                <Heading title='Manage Orders' center/>
            </div>
            <div style={{height: 600, width: "100%"}} className="bg-white rounded-lg shadow-sm">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 9}
                        }
                    }}
                    pageSizeOptions={[9, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    )
}

export default ManageOrdersClient;
