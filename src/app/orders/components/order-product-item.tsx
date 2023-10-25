import { computeProductTotalPrice } from "@/helpers/product";
import { OrderProduct, Prisma } from "@prisma/client";
import Image from "next/image"

interface OrderProductItemProps {
    orderProduct: Prisma.OrderProductGetPayload<{
        include: {
            product: true
        }
    }>
}

const orderProductItem = ({orderProduct} : OrderProductItemProps) => {
    const productWithTotalPrice = computeProductTotalPrice(orderProduct.product)
    return ( 
        <div className="flex items-center gap-4">
            <div className="flex items-center justify-center bg-accent rounded-lg w-[100px] h-[77px]">
                <Image
                    src={orderProduct.product.imageUrls[0]}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
                    alt={orderProduct.product.name}
                />
            </div>

            <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-center bg-accent px-2 py-1 rounded-md">
                    <p className="text-xs">Vendido e entregue por: <span className="font-bold">FSW-Store</span></p>
                </div>
                <p className="text-xs">{orderProduct.product.name}</p>

                <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                        <p className="text-sm font-bold">R$ {productWithTotalPrice.totalPrice.toFixed(2)}</p>
                        {productWithTotalPrice.discountPercentage > 0 && (
                            <p className="text-xs line-through opacity-60">
                                R$ {Number(productWithTotalPrice.basePrice).toFixed(2)}
                            </p>
                        )}
                    </div>

                    <p className="text-xs opacity-60">Qtd: {orderProduct.quantity}</p>
                </div>                

            </div>
        </div>
     );
}
 
export default orderProductItem;