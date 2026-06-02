import { useDispatch } from "react-redux"
import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux"
import { clearCart } from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";
import Modal from "./Modal";

export default function PriceBox() {
  const { total } = useAppSelector((state) => state.cart)
  const { isOpen } = useAppSelector((state) => state.modal)

  const dispatch = useDispatch();
  const handleOpenModal = () : void => {
      dispatch(openModal())
  }

  return (
    <>
      <div className="p-12 flex justify-between">
        <button
        onClick={handleOpenModal}
        className="border p-4 rounded-md cursor-pointer">장바구니 초기화</button>
        <div>총 가격: {total}원</div>
      </div>
      {isOpen && <Modal/>}
    </>
  )
}
