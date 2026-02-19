"use client"

import { Product } from '@/app/types/ProductFormType'
import React, { useCallback } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatePrice } from '@/app/utils/formatePrice';
import { Heading } from '@/app/components/Heading';
import { Status } from '@/app/components/Status';
import { MdDelete, MdRemoveRedEye, MdClose, MdDone, MdCached } from 'react-icons/md';
import ActionBtn from '@/app/components/ActionBtn';
import { deleteProduct, toggleStockStatus } from '@/app/services/admin.service';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface ManageProductsProps {
    products: Product[]
}

const ManageProductsClient: React.FC<ManageProductsProps> = ({ products }) => {

    const router = useRouter();

    // Safe check for rows
    let rows: any = [];
    if (products) {
        rows = products.map((p) => {
            return {
                id: p.id,
                name: p.name,
                price: formatePrice(p.price),
                category: p.category,
                brand: p.brand,
                inStock: p.inStock,
                images: p.images,
                categoryName: p.categoryName
            };
        });
    }

    // --- 1. TOGGLE STOCK HANDLER ---
    const handleToggleStock = useCallback((id: number, currentStatus: boolean) => {
        const newStatus = currentStatus ? "Out of Stock" : "In Stock";
        const toastId = toast.loading(`Changing to ${newStatus}...`);

        toggleStockStatus(id)
            .then(() => {
                toast.success("Status Updated", { id: toastId });
                router.refresh();
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to update status", { id: toastId });
            });
    }, [router]);


    const handleDelete = useCallback(async (id: number) => {

        if (!window.confirm("Are you sure you want to delete this product?")) return;

        const toastId = toast.loading("Deleting product...");

        try {
            // 2. Call API (Backend handles Cloudinary + DB)
            await deleteProduct(id);

            toast.success("Product deleted successfully", { id: toastId });

            // 3. UI Refresh (Important for Next.js)
            router.refresh();

        } catch (error) {
            console.error(error);
            toast.error("Failed to delete product", { id: toastId });
        }
    }, [router]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 220 },
        {
            field: 'price',
            headerName: 'Price (INR)',
            width: 160,
            renderCell: (params) => {
                return (
                    <div className='font-bold text-slate-800'>
                        {params.row.price}
                    </div>
                )
            }
        },
        { field: 'categoryName', headerName: 'Category', width: 130 },
        { field: 'brand', headerName: 'Brand', width: 130 },
        {
            field: 'inStock',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className='flex justify-start w-full'>
                        {params.row.inStock === true ? (
                            <Status
                                text='In Stock'
                                icon={MdDone}
                                bg='bg-teal-200'
                                color='text-teal-700'
                            />
                        ) : (
                            <Status
                                text='Out of Stock'
                                icon={MdClose}
                                bg='bg-rose-200'
                                color='text-rose-700'
                            />
                        )}
                    </div>
                )
            }
        },
        {
            field: 'action',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className='flex justify-start gap-3 w-full mt-2'>
                        {/* View / Edit Button */}
                        <ActionBtn
                            icon={MdCached}
                            onClick={() => {
                                handleToggleStock(params.row.id, params.row.inStock);
                            }}
                        />                        <ActionBtn
                            icon={MdRemoveRedEye}
                            onClick={() => {
                                router.push(`/product/${params.row.id}`);
                            }}
                        />

                        {/* Delete Button */}
                        <ActionBtn
                            icon={MdDelete}
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <div className='max-w-[1200px] m-auto text-xl'>
            <div className='mb-4 mt-8'>
                <Heading title='Manage Products' center />
            </div>

            <div style={{ height: 600, width: "100%" }} className="bg-white rounded-lg shadow-sm">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 9 }
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

export default ManageProductsClient;
