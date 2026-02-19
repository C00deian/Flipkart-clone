"use client";

import React from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdAccessTimeFilled, MdDone, MdDeliveryDining, MdRemoveRedEye } from "react-icons/md";

import type { Orders } from "@/app/types/OrderTypes";
import { Heading } from "@/app/components/Heading";
import { Status } from "@/app/components/Status";
import ActionBtn from "@/app/components/ActionBtn";
import { formatePrice } from "@/app/utils/formatePrice";

interface OrdersClientProps {
  orders: Orders[];
}

const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  const rows =
    orders && Array.isArray(orders)
      ? orders.map((odr) => ({
          id: odr.id,
          amount: formatePrice(odr.totalPrice),
          paymentStatus: odr.paymentStatus,
          orderStatus: odr.orderStatus,
          date: moment(odr.orderDate).fromNow(),
        }))
      : [];

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 240 },
    {
      field: "amount",
      headerName: "Amount (INR)",
      width: 150,
      renderCell: (params) => <div className="font-bold text-slate-800">{params.row.amount}</div>,
    },
    {
      field: "paymentStatus",
      headerName: "Payment",
      width: 140,
      renderCell: (params) => (
        <div>
          {params.row.paymentStatus === "SUCCESS" ? (
            <Status text="Paid" icon={MdDone} bg="bg-green-200" color="text-green-700" />
          ) : (
            <Status text="Pending" icon={MdAccessTimeFilled} bg="bg-rose-200" color="text-rose-700" />
          )}
        </div>
      ),
    },
    {
      field: "orderStatus",
      headerName: "Delivery",
      width: 140,
      renderCell: (params) => (
        <div>
          {params.row.orderStatus === "DELIVERED" && (
            <Status text="Delivered" icon={MdDone} bg="bg-green-200" color="text-green-700" />
          )}
          {params.row.orderStatus === "SHIPPED" && (
            <Status text="Dispatched" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />
          )}
          {(params.row.orderStatus === "PLACED" || params.row.orderStatus === "PENDING") && (
            <Status text="Pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
          )}
        </div>
      ),
    },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 110,
      renderCell: (params) => (
        <div className="flex justify-center w-full mt-2">
          <ActionBtn
            icon={MdRemoveRedEye}
            onClick={() => {
              router.push(`/orders/${params.row.id}`);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="My Orders" center />
      </div>
      <div style={{ height: 600, width: "100%" }} className="bg-white rounded-lg shadow-sm">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default OrdersClient;

