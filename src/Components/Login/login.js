import React from 'react'
import { Paper } from '@material-ui/core'
import backgroundImage from "../../images/signUpImage.webp";
import LogoImage from "../../images/loginImage.jpg";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Link, useNavigate} from "react-router-dom";
import { UserLogin } from "../../BusinessLogic";
import { ShowMessage, type } from "../Toaster";
// import * as Loader from "react-loader-spinner";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TailSpin } from  'react-loader-spinner'

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden"
    },
    formContainer: {
        width: "40%",
        height: "100%"
    },
    paper: {
        height: "100%",
        boxShadow: "0px 8px 0px 0px gray",
        alignItems: "center",
        display: "flex",
        flexDirection: "column"
    },
    logoContainer: {
        width: "100%",
        color: "#36466F",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column"
    },
    logo: {
        width: "10%",
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        border: "1px solid #36466F",
        marginTop: 40
    },
    form: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    emailInput: {
        margin: 10,
        width: "80%",
    },
    passwordInput: {
        margin: 10,
        width: "80%"
    },
    email: {
        width: "100%",
    },
    password: {
        width: "100%"
    },
    forgotPassword: {
        alignSelf: "flex-start",
        marginTop: -0.5,
        marginLeft: "10%",
        color: "#36466F",
        cursor: "pointer"
    },
    button: {
        backgroundColor: "red",
        width: "80%",
        color: 'white',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        '&:hover': {
            backgroundColor: "red",
        }
    },
    signUp: {
        color: "#36466F",
        cursor: "pointer"
    },
    logoTextOne: {
        color: "red",
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: "32px"
    },
    logoTexttwo: {
        color: "#36466F",
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: "32px"
    },
    footer: {
        marginTop: 80,
        color: "#36466F"
    },
    footerContactUs: {
        cursor: "pointer"
    },
    imageContainer: {
        width: "60%",
        height: "100%",
        overflow: "hidden"
    },
     [theme.breakpoints.down('sm')]: {
        imageContainer:{
                display: 'none'
             }, formContainer: {
                width: "100%",
                height: "100%"
            },
          },
    overlay: {
        width: "inherit",
        height: "100%",
        backgroundColor: "#00000080",
        position: "absolute"
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    },
    error: {
        color: "salmon",
      },

}));

function Login() {
    const classes = useStyles();
    const navigate = useNavigate()
    const [processing, setProcessing] = React.useState(false)
    



    const handleSubmit = async (values) => {
        console.log(values)
        try {
            setProcessing(true)
            const res = await UserLogin({
                email: values.email,
                password: values.password,
            });
            if (res.data.responseCode === "00") {
                localStorage.setItem("access-token", res.data.data.accessToken);
                localStorage.setItem("send-money", JSON.stringify(res.data.data.user));
                setProcessing(false)
                ShowMessage(type.DONE, res.data.message);
                navigate('/dashboard')
                
            }else{
                setProcessing(false)
                ShowMessage(type.ERROR, res.data.message);
            }
        } catch (err) {
            setProcessing(false)
            ShowMessage(type.ERROR, err.data.message);
            console.log(err)
        }
    }

    const ValidationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required").trim(),
        password: Yup.string()
            .required("No password provided.")
            .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,100}$/,
                "Password must be more than 8 characters and contain atleast one capital letter and one special character."
            ),
    });

    
    return (
        <div className={classes.container}>
            
            <div className={classes.formContainer}>
                <Paper className={classes.paper}>
                    <div className={classes.logoContainer}>
                        <div >
                            <img src={LogoImage} alt="logo" style={{ width: "100%", height: "100%", borderRadius: "100%" }} />
                        </div>
                        <p>
                            <span className={classes.logoTextOne}>Transfer</span><span className={classes.logoTexttwo}>Zone</span>
                        </p>
                    </div>

                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={ValidationSchema}
                        onSubmit={async (values) => {
                            await handleSubmit(values);
                        }}
                    >
                        {({ errors, touched, handleChange }) => (
                            <Form className={classes.form}>
                                    <div className={classes.emailInput}>
                                        <TextField
                                            id="outlined-basic"
                                            type="email"
                                            name="email"
                                            onChange={handleChange('email')}
                                            label="Email"
                                            variant="outlined"
                                            className={classes.email}
                                        />
                                        {errors.email && touched.email ? (
                                            <div className={classes.error}>{errors.email}</div>
                                        ) : null}
                                    </div>

                                    <div className={classes.passwordInput}>
                                        <TextField
                                            id="outlined-basic"
                                            type="password"
                                            name="password"
                                            onChange={handleChange('password')}
                                            label="Password"
                                            variant="outlined"
                                            className={classes.password}
                                        />
                                        {errors.password && touched.password ? (
                                            <div className={classes.error}>{errors.password}</div>
                                        ) : null}
                                    </div>
                                   
                                
                                <Button type="submit" className={classes.button} >
                                {processing ? (
                                    <TailSpin
                                    heigth="30"
                                    width="30"
                                    color='#fff'
                                    ariaLabel='loading'
                                  />
                                ): "Log In"}
                                    {/* login */}
                                    </Button>

                            </Form>
                        )}
                    </Formik>

                    <h5>Don't have an account? <span className={classes.signUp} onClick={() => navigate("/signup")}>Sign Up!</span></h5>

                    <p className={classes.footer}> &copy; 2022 TransferZone Inc | <span className={classes.footerContactUs}>Contact Us</span></p>
                </Paper>
            </div>
            
            <div className={classes.imageContainer}>
                <div className={classes.overlay}></div>
                <div className={classes.imageBackground}></div>
            </div>

        </div>

    )
}

export default Login