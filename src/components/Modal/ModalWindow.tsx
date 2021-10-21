import React, {FC, memo} from 'react';
import style from './ModalWindow.module.scss'
import AddItemForm from "../AddItemForm/AddItemForm";
import {Grid, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Close} from "@material-ui/icons";


type ModalWindowType = {
    title: string | null
    addTitle: (title: string) => void
    handleClose: () => void
}

export const ModalWindow: FC<ModalWindowType> = memo(props => {
    const {
        title,
        addTitle,
        handleClose
    } = props

    return <div className={style.container}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item xs={10}>
                <Typography variant="h5">
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <IconButton onClick={handleClose}>
                    <Close fontSize={"medium"} color={"error"}/>
                </IconButton>
            </Grid>
        </Grid>
        <AddItemForm addItem={addTitle} handleClose={handleClose}/>
    </div>
})