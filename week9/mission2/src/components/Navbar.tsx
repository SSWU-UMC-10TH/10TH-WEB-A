import { useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/useCustomRedux";
import { calculateToals } from "../slices/cartSlice";

export default function Navbar() {

  const { amount, cartItem } = useAppSelector((state) => state.cart)
  const dispatch = useDispatch();

  useEffect(() : void => {
    dispatch(calculateToals())
  }, [dispatch, cartItem])

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
