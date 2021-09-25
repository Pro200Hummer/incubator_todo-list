import React, {useCallback} from "react";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {setError} from "../../app/app-reducer";


const ErrorSnackbarContainer: React.FC = React.memo(() => {

    const error = useSelector<AppRootStateType, string | null>((state) => state.app.error)
    const dispatch = useDispatch()
    const isOpen = error !== null

    const zeroingError = useCallback(() => {
        dispatch(setError(null))
    },[dispatch])

    return (
        <>
            <ErrorSnackbar
                error={error}
                isOpen={isOpen}
                zeroingError={zeroingError}
            />
        </>
    )
})
export default ErrorSnackbarContainer