import { OrdersDetail } from "src/ordersDetails/OrderDetails.entity";

export class OrderResponseDto {
    id: string;
    price: number;
    products: object[];
    order: {
        id:string;
        date: Date;
        user: {
            id:string;
        }
    }

    constructor(orderDetail: OrdersDetail) {
        this.id = orderDetail.id;
        this.price = orderDetail.price;
        this.products = orderDetail.products;
        this.order = {
            id: orderDetail.order.id,
            date: orderDetail.order.date,
            user: {
                id:orderDetail.order.user.id
            }

        }
    }
}
