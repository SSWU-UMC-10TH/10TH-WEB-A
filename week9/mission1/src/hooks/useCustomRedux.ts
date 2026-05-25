import { useSelector, useDispatch as useDefaultDispatch, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

export const useAppDispatch: () => AppDispatch = useDefaultDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
