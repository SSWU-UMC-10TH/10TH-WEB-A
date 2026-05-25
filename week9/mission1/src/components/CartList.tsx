import { useAppSelector } from "../hooks/useCustomRedux";
import CartItem from "./CartItem"

export default function CartList() {
  const cartItem = useAppSelector((state) => state.cart.cartItem)

  return (
    <div className="flex flex-col items-center justify-center">
        <ul>
            {cartItem.map((item)=>(
                <CartItem key={item.id} lp={item} />
            ))}
        </ul>
    </div>
  )
}
