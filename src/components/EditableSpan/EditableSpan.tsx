import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeItem: (title: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log("EditSpan clicked")
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        props.changeItem(title)
    }

    const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") offEditMode()
    }

    return (
        editMode ?
            <TextField
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={changeTitle}
                onKeyPress={onKeyPressEditMode!}
            /> :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    );
})

export default EditableSpan;