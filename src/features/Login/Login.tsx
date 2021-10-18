import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {FormikHelpers, useFormik} from "formik";
import {LoginParamsType} from "../../api/api-types";
import {asyncAuthActions, login} from "./auth-reducer";
import {useAppDispatch} from "../../app/hooks";

type LoginPropsType = {
    loginHandler: (loginData: LoginParamsType) => void
}

export const Login: React.FC<LoginPropsType> = React.memo(props => {

    const dispatch = useAppDispatch()

    const {
        loginHandler,
    } = props

    const validate = (values: LoginParamsType) => {
        const errors: LoginParamsType = {};
        if (!values.email) {
            errors.email = 'Enter your email';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Enter valid email address';
        }
        if (!values.password) {
            errors.password = 'Enter password';
        } else if (values.password.length <= 2) {
            errors.password = 'Password must be more then 2 characters';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: async (values, formikHelpers:FormikHelpers<LoginParamsType>) => {
            const action = await dispatch(asyncAuthActions.login(values))
            console.log(action)
            if(login.rejected.match(action)){
                if(action.payload?.fieldsErrors?.length){
                    const error = action.payload.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
        },
    });

    return (
        <Grid container justifyContent="center">
            <Grid item xs={ 4 }>
                <form onSubmit={ formik.handleSubmit }>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={ 'https://social-networ.samuraijs.com/' }
                                   target={ '_blank' } rel="noopener noreferrer">here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                { ...formik.getFieldProps("email") }
                            />
                            { formik.touched.email && formik.errors.email ?
                                <div style={ {color: 'red'} }>{ formik.errors.email }</div> : null }

                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                { ...formik.getFieldProps("password") }
                            />

                            { formik.touched.password && formik.errors.password ?
                                <div style={ {color: 'red'} }>{ formik.errors.password }</div> : null }

                            <FormControlLabel
                                label={ 'Remember me' }
                                control={ <Checkbox
                                    { ...formik.getFieldProps("rememberMe") }
                                    checked={ formik.values.rememberMe }
                                /> }
                            />
                            <Button type={ 'submit' } variant={ 'contained' } color={ 'primary' }>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
})
