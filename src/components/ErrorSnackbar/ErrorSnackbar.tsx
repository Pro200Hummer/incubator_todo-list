import React, {useState} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {AppReducerStateType, setErrorAC} from "../../reducers/app-reducer";

type ErrorSnackbarPropsType = {
    error: string | null
    isOpen: boolean
    zeroingError: () => void
}

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const ErrorSnackbar: React.FC<ErrorSnackbarPropsType> = React.memo(props => {

    const {
        error,
        isOpen,
        zeroingError
    } = props

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        zeroingError()
    }

    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
})
