import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import type { CartItem } from "../types/cart"
import cartItems from "../constant/cartItem"
import { useShallow } from "zustand/shallow"

interface CartActions {
    increase: (id: string) => void
    decrease: (id: string) => void
    removeItem: (id: string) => void
    clearCart: () => void
    calculateTotals: () => void
}

interface CartState {
    cartItems: CartItem
    amount:  number
    total: number
    actions: CartActions
}

export const useCartStore = create<CartState>()(
    // eslint-disable @typescript-eslint/no-unused-vars
    immer((set,_) => ({
        cartItems: cartItems,
        amount: 0,
        total: 0,
        actions: {
            increase: (id: string): void => {
                set((state) => {
                    // set((state) -> ({
                    // cartItems: state.cartItems.map((item) => 
                    // item.id === id ? {...item, amount: item.amount + 1 } : item
                    // )
                    // }))
                    const cartItem = state.cartItems.find((item): boolean => item.id === id)
                    if (cartItem) {
                        cartItem.amount += 1;
                    }
                })
            },
            decrease: (id: string): void => {
                  set((state):void => {
                    const cartItem = state.cartItems.find((item): boolean => item.id === id)
                    if (cartItem && cartItem.amount > 0){
                        cartItem.amount -= 1
                    }
                  })
            },
            removeItem: (id: string): void => {
                set((state): void => {
                    state.cartItems = state.cartItems.filter((item): boolean => item.id !== id)
                })
            },
            clearCart: (): void => {
                set((state): void => {
                    state.cartItems = []
                })
            },
            calculateTotals: (): void => {
                set((state): void => {
                    let amount = 0
                    let total = 0

                    state.cartItems.forEach((item): void => {
                        amount += item.amount 
                        total += item.amount * item.price
                    })

                    state.amount = amount
                    state.total = total
                })
            },
        },
    }))
)


//immer 불변성 유지, zustand에 내장되어있음 (원래는 따로 설치해야함)
// const nextState = produce(BaseStationLine, draft => {
//     [...state,]
// })

export const useCartInfo = (): { cartItems: CartItem; amount: number; total: number } =>
    useCartStore(
        useShallow((state): { cartItems: CartItem; amount: number; total: number } => ({
            cartItems: state.cartItems,
            amount: state.amount,
            total: state.total
        }))
    )

export const useCartActions = (): CartActions => useCartStore((state): CartActions => state.actions)