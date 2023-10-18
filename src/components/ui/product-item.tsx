import { ProductWithTotalPrice } from "@/helpers/product";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "./badge";


interface ProductItemProps {
    product: ProductWithTotalPrice
}

const ProductItem = ({product}: ProductItemProps) => {
    return (
        <div className="flex flex-col gap-4 max-w-[170px]">
            <div className="relative bg-accent rounded-lg h-[170px] w-[170px] flex items-center justify-center">
                <Image 
                    src={product.imageUrls[0]}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-auto w-auto max-w-[80%] max-h-[70%]"
                    style={{
                        objectFit: "contain"
                    }}
                    alt={product.name}
                />

                {product.discountPercentage > 0 && (
                    <Badge className="absolute left-2 top-2">
                        <ArrowDownIcon size={12} /> {product.discountPercentage}%
                    </Badge>
                )}  
            </div>

            

            <div>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{product.name}</p>

                <div className="flex items-center gap-2">
                    {product.discountPercentage > 0 ? (
                        <>
                            <p className="font-semibold">R$ {product.totalPrice.toFixed(2)}</p>
                            <p className="text-xs opacity-75 line-through">R$ {Number(product.basePrice).toFixed(2)}</p>
                        </>                        
                    ) : (
                        <p className="font-semibold text-sm">R$ {product.basePrice.toFixed(2)}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default ProductItem;