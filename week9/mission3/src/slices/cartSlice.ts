import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constant/cartItem";
import { type CartItem } from "../types/cart";

export interface CartState {
    cartItem: CartItem;
    amount: number;
    total: number;
}

const initialState: CartState ={
    cartItem: cartItems,
    amount: 0,
    total: 0,
}

// cartSlice 생성
// createSlice -> reduxToolkit에서 제공
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // TODO : 증가
        increase: (state, action: PayloadAction<{ id: string }>) : void => {
            const itemId = action.payload.id;
            // 이 아이디를 통해서 , 전체 음반 중에 내가 클릭한 음반 찾기
            const item = state.cartItem.find((cartItems):any => cartItems.id === itemId)

            if (item)
                item.amount += 1
        },
        // TODO : 감소
        decrease: (state, action: PayloadAction<{ id: string }>) : void => {
            const itemId = action.payload.id;
            // 이 아이디를 통해서 , 전체 음반 중에 내가 클릭한 음반 찾기
            const item = state.cartItem.find((cartItems):any => cartItems.id === itemId)

            if (item)
                item.amount -= 1 
        },
        // TODO : removeItem 아이템 제거
        removeItem: (state, action: PayloadAction<{ id: string }>) :void => {
            const itemId = action.payload.id;
            state.cartItem = state.cartItem.filter(
                (cartItems) : Boolean => cartItems.id !== itemId
            )
        },
        // TODO : clearCart 장바구니 비우기 
        clearCart: (state) :void => {
            state.cartItem = [];
        },
        // TODO : 총액 계산
        calculateToals: (state) : void => {
            let amount = 0;
            let total = 0;
            state.cartItem.forEach((item)=>{
                amount += item.amount;
                total += item.amount * item.price;
            })

            state.amount = amount;
            state.total = total;
        }
    },
})

export const { increase, decrease, removeItem, clearCart, calculateToals } = cartSlice.actions

// duck pattern reducer 는 export default로 내보내야함.
const cartReducer = cartSlice.reducer;

export default cartReducer