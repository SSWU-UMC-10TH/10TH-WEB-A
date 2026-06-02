import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
    isOpen: boolean
}

const initialState: ModalState = {
    isOpen: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state): void => {
            state.isOpen = true;
        },   
        closeModal: (state): void => {
            state.isOpen = false;
        },   
    }
})

export const  { openModal, closeModal } = modalSlice.actions

const modalReducer = modalSlice.reducer;

export default modalReducer