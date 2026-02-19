
export type Orders =  {
  id: string;
  customerId: string;
  orderStatus: string;
  paymentStatus: string;
  totalPrice: number;
  orderDate: string
  items: Items[]
};

export type Items = {
  productId: number,
  productName: string,
  productImage: string
  quantity: number,
  unitPrice: number,
  totalPrice: number
}


// {
//     "id": "7802bd48-35ec-40a1-a3ce-cfe9c7c9c977",
//     "customerId": "7",
//     "orderStatus": "DELIVERED",
//     "paymentStatus": "SUCCESS",
//     "totalPrice": 400072,
//     "orderDate": "2025-12-30T02:39:49Z",
//     "items": [
//         {
//             "productId": 3,
//             "productName": "Realme  13 pro",
//             "productImage": null,
//             "quantity": 1,
//             "unitPrice": 400000,
//             "totalPrice": 400000
//         },
//         {
//             "productId": 18,
//             "productName": "manoj",
//             "productImage": null,
//             "quantity": 6,
//             "unitPrice": 12,
//             "totalPrice": 72
//         }
//     ]
// }
