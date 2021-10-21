import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import {BtnContainer} from "../../utils/styles-util";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    handleClose: () => void
    disabled?: boolean
}

const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(props => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const addItemTitle = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItemTitle()
    }

    return (
        <div>
            <TextField
                value={title}
                label={"Title"}
                variant={"standard"}
                error={error}
                disabled={props.disabled}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                onBlur={() => setError(false)}
            />
            {error && <div className={"error-message"}>{"Title is required!"}</div>}
            <BtnContainer>
                <div>
                    <Button variant="text" color="error" onClick={props.handleClose}>Cancel</Button>
                </div>
                <div>
                    <Button variant="text" onClick={addItemTitle}>Save</Button>
                </div>
            </BtnContainer>
        </div>
    );
})

export default AddItemForm
