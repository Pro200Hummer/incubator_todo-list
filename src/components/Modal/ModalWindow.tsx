import React, {FC, memo} from 'react';
import {Typography} from "@material-ui/core";
import AddItemForm from "../AddItemForm/AddItemForm";

type ModalWindowType = {
    title: string | null
    addTitle: (title: string) => void
}

export const ModalWindow: FC<ModalWindowType> = memo(props => {
    const {
        title,
        addTitle
    } = props

    return <div>
        <Typography variant="h5">
            {title}
        </Typography>
        <AddItemForm addItem={addTitle}/>
    </div>
})