import React from 'react'
import { Paper } from '@material-ui/core'
import backgroundImage from "../../images/signUpImage.webp";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import LogoImage from "../../images/loginImage.jpg";
import { Link, useNavigate} from "react-router-dom";
import { UserSignUp } from "../../BusinessLogic";
import { ShowMessage, type } from "../Toaster";
import * as Loader from "react-loader-spinner";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

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
    [theme.breakpoints.down('sm')]: {
        imageContainer:{
                display: 'none'
             },
              formContainer: {
                width: "100%",
                height: "100%"
            },
          },
    paper: {
        height: "100%",
        boxShadow: "0px 8px 0px 0px gray",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        overflow: "scroll"
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
        alignItems: "center"
    },
    emailInput: {
        margin: 10,
        width: "80%"
    },
    passwordInput: {
        marginTop: 20,
        width: "80%"
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
        marginTop: 50,
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

    logoTextOnedesc: {
        color: "red",
        fontWeight: "bold",
        fontStyle: "italic",
    },
    logoTexttwodesc: {
        color: "#36466F",
        fontWeight: "bold",
        fontStyle: "italic",
    },
    footer: {
        marginTop: 135,
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
    inputContainer: {
        margin: 10,
        width: "80%"
    },
    input: {
        width: "100%",
    },

}));

function SignUp() {
    const classes = useStyles();
    const navigate = useNavigate()
    const [processing, setProcessing] = React.useState(false)
   
    const handleSubmit = async (values) => {
       
        try {
            setProcessing(true)
            const res = await UserSignUp({
                name: values.name,
                email: values.email,
                password: values.password,
                repeatPassword: values.repeatPassword
            });
            if (res.data.responseCode === "00") {
                localStorage.setItem("token", res.data.token);
                setProcessing(false)
                ShowMessage(type.DONE, res.data.message);
                navigate('/')
            }else {
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
        name: Yup.string().required("Full Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required").trim(),
        password: Yup.string()
            .required("No password provided.")
            .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,100}$/,
                "Password must be more than 8 characters and contain atleast one capital letter and one special character."
            ),
        repeatPassword: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Pasword do not match."
            )
        })
    })


  
    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <Paper className={classes.paper}>
                <div className={classes.logoContainer}>
                        <div >
                            <img src={LogoImage} alt="logo" style={{ width: "100%", height: "100%", borderRadius: "100%" }} />
                        </div>
                        <p>
                            <span className={classes.logoTextOne}>Send</span><span className={classes.logoTexttwo}>Money</span>
                        </p>
                    </div>
                    <div className={classes.logoContainer}>
                        <p> <span className={classes.logoTextOnedesc}>Send</span><span className={classes.logoTexttwodesc}>Money</span> credits your account with $1000 upon successful sign up. T & C applies.</p>
                    </div>



                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: '',
                            repeatPassword: ""
                        }}
                        validationSchema={ValidationSchema}
                        onSubmit={async (values) => {
                            await handleSubmit(values);
                        }}
                    >
                        {({ errors, touched, handleChange }) => (
                            <Form className={classes.form}>
                                <div className={classes.inputContainer}>
                                    <TextField
                                        id="outlined-basic"
                                        type="text"
                                        name="name"
                                        label="Full Name"
                                        variant="outlined" className={classes.input}
                                        onChange={handleChange('name')}
                                    />
                                    {errors.fullname && touched.fullname ? (
                                        <div className={classes.error}>{errors.fullname}</div>
                                    ) : null}
                                </div>

                                <div className={classes.inputContainer}>
                                    <TextField
                                        id="outlined-basic"
                                        type="email"
                                        label="Email"
                                        name="email"
                                        variant="outlined"
                                        className={classes.input}
                                        onChange={handleChange('email')}
                                    />
                                    {errors.email && touched.email ? (
                                        <div className={classes.error}>{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className={classes.inputContainer}>
                                    <TextField
                                        id="outlined-basic"
                                        type="password"
                                        label="Password"
                                        variant="outlined"
                                        className={classes.input}
                                        name="password"
                                        onChange={handleChange('password')}
                                    />
                                    {errors.password && touched.password ? (
                                        <div className={classes.error}>{errors.password}</div>
                                    ) : null}
                                </div>

                                <div className={classes.inputContainer}>
                                    <TextField
                                        id="outlined-basic"
                                        type="password"
                                        label="Repeat Password"
                                        variant="outlined"
                                        className={classes.input}
                                        name="repeatPassword"
                                        onChange={handleChange('repeatPassword')}
                                    />
                                    {errors.repeatPassword && touched.repeatPassword ? (
                                        <div className={classes.error}>{errors.repeatPassword}</div>
                                    ) : null}
                                </div>
                                <Button
                                    type="submit"
                                    className={classes.button}>
                                    {/* {processing ? (
                                        <Loader
                                            type="TailSpin"
                                            color="#00BFFF"
                                            height={40}
                                            width={40}
                                        />
                                    ) : "Sign Up"} */}
                                    Sign up
                                </Button>


                            </Form>
                        )}
                    </Formik>
                
                    <h5> Already have account? <span className={classes.signUp} onClick={() => navigate("/")} >Sign In!</span></h5>

                    <p className={classes.footer}> &copy; 2022 SendMoney Inc | <span className={classes.footerContactUs}>Contact Us</span></p>
                </Paper>
            </div>
            <div className={classes.imageContainer}>
                <div className={classes.overlay}></div>
                <div className={classes.imageBackground}></div>
            </div>

        </div>
    )
}

export default SignUp