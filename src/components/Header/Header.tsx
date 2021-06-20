import React from 'react'
import {ErrorSnackbar} from "../ErrorSnackbar/ErrorSnackbar";
import {AppBar} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {Menu} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {RequestStatusType} from "../../reducers/app-reducer";

type HeaderPropsType = {
    appStatus: RequestStatusType
}

const Header: React.FC<HeaderPropsType> = React.memo(props => {

    const {
        appStatus
    } = props

    return (
        <>
            <AppBar position="static">
                { appStatus === 'loading' && <LinearProgress color="secondary"/> }
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </>
    )
})
export default Header