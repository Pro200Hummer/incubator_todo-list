import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootStateType, ThunkAppDispatch} from "./store";

export const useAppDispatch = () => useDispatch<ThunkAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;