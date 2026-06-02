import { immer } from "zustand/middleware/immer"
import { create } from "zustand"
import { useShallow } from "zustand/shallow"

interface ModalActions {
    openModal: () => void
    closeModal: () => void
}

interface ModalState {
    isOpen: boolean
    actions: ModalActions
}

export const useModalStore = create<ModalState>()(
    immer((set) => ({
        isOpen: false,
        actions: {
            openModal: (): void => {
                set((state): void => {
                    state.isOpen = true
                })
            },
            closeModal: (): void => {
                set((state): void => {
                    state.isOpen = false
                })
            },
        },
    }))
)

export const useModalInfo = (): { isOpen: boolean } =>
    useModalStore(
        useShallow((state): { isOpen: boolean } => ({
            isOpen: state.isOpen,
        }))
    )

export const useModalActions = (): ModalActions => useModalStore((state): ModalActions => state.actions)
