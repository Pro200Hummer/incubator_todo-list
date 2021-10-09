import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import {Alert, AlertProps} from "@material-ui/core";

type ErrorSnackbarPropsType = {
    error: string | null
    isOpen: boolean
    zeroingError: () => void
}

/*const Alert = (props: AlertProps) => {
    return <Alert elevation={6} variant="filled" {...props}/>
};*/

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
            <Alert onClose={handleClose} severity="error" elevation={6} variant="filled">
                {error}
            </Alert>
        </Snackbar>
    )
})
