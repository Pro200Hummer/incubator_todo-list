import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }

    return (
        <div>
            <TextField
            value={ title }
            label={"Title"}
            error={error}
            onChange={ onChangeHandler }
            onKeyPress={ onKeyPressHandler }
            onBlur={() => setError(false)}
            />
            <IconButton onClick={ addItem }>
                <AddBox/>
            </IconButton>
            { error && <div className={ "error-message" }>{ "Title is required!" }</div> }
        </div>
    );
}

export default AddItemForm;