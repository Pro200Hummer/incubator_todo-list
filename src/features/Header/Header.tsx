import React from 'react'
import {AppBar, Grid} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {Menu} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {RequestStatusType} from "../../app/app-types";

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
                {status === 'loading' && <LinearProgress color="secondary"/>}
                <Toolbar>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item xs={11}>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <Menu/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={1}>
                            {isLoggedIn ?
                                <Button color="inherit" variant="outlined" onClick={logoutClickHandler}>
                                    Log out
                                </Button> :
                                <Button color={"inherit"} variant="outlined">Login</Button>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    )
})
export default Header