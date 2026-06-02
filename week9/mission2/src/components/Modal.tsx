import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/useCustomRedux";
import { closeModal } from "../slices/modalSlice";
import { clearCart } from "../slices/cartSlice";

export default function Modal() {
    // const { isOpen } = useAppSelector((state) => state.modal)
    const dispatch = useDispatch();

    const handleCloseModal = () : void => {
        dispatch(closeModal())
    }

    const handleInitialCart = () : void => {
        dispatch(clearCart())
        dispatch(closeModal())
    }

  return (
    <div className="fixed inset-0 bg-black/50">
        <div className="fixed bg-white rounded-lg flex flex-col gap-4 p-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <h3 className="font-bold">정말 삭제하시겠습니까?</h3>
            <div className="flex justify-end space-x-4 ">
                <button onClick={handleCloseModal} className="bg-gray-200 p-2 rounded-sm text-gray-500">아니요</button>
                <button onClick={handleInitialCart} className="bg-red-500 px-4 rounded-sm text-white">네</button>
            </div>
        </div>
        <div></div>
    </div>
  )
}
