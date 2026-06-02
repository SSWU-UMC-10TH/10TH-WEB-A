import Modal from "./Modal";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { useModalActions, useModalInfo } from "../hooks/useModalStore";

export default function PriceBox() {
  const { isOpen } = useModalInfo()
  const { openModal } = useModalActions()
  const handleOpenModal = () : void => {
      openModal()
  }

  const { total } = useCartInfo()
  const { clearCart } = useCartActions()

  const handleAllClearButton = () : void => {
    clearCart()
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
