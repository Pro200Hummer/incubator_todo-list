import React from 'react'
import {AppBar} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {Menu} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {RequestStatusType} from "../../app/app-reducer";

type HeaderPropsType = {
    status: RequestStatusType
    isLoggedIn: boolean
    logoutClickHandler: () => void
}

const Header: React.FC<HeaderPropsType> = React.memo(props => {

    const {
        status,
        isLoggedIn,
        logoutClickHandler
    } = props

    return (
        <>
            <AppBar position="static">
                { status === 'loading' && <LinearProgress color="secondary"/> }
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    { isLoggedIn && <Button color="inherit" onClick={logoutClickHandler}>Log out</Button> }
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </>
    )
})
export default Header