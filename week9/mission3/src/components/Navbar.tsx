import { useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

export default function Navbar() {
  const {amount, cartItems} = useCartInfo()
  const {calculateTotals} = useCartActions()

  useEffect(() : void => {
    calculateTotals();
  }, [cartItems, calculateTotals])

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800
    text-white">
        <h1
        onClick={():void => {
          window.location.href = '/';
        }}
        className="text-2xl font-semibold cursor-pointer">연</h1>
        <div className="flex items-center space-x-2">
            <FaShoppingBag className="text-2xl" />
            <span className="text-xl font-medium">{amount}</span>
        </div>
    </div>
  )
}
