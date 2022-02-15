import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment"
import MainLayout from '../DashboardLayout';
import { Paper, Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import { ShowMessage, type } from "../Toaster";
import * as Loader from "react-loader-spinner";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios"
import {getAllUsers, MakeTransfer} from "../../BusinessLogic"

const useRowStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
            borderTop: "1px solid rgba(224, 224, 224, 1)",
        },
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        width: "50%",
        padding: 10
    },
    inputContainer: {
        display: "flex",
        width: "100%",
        marginBottom: 20,
        marginTop: 10
    },
    sendingInput: {
        width: "70%"
    },
    sendingCurrencyInput: {
        width: "30%",

    },
    receiversInput: {
        width: "100%"
    },
    receivingCurrencyInput: {
        width: "30%",

    },
    receivingInput: {
        width: "70%",

    },
    amountInput: {
        width: "100%",
        fill: "none",
        backgroundColor: "#fff",
        height: 75,
        borderRight: "none",
        borderTop: "0.1px solid",
        fontSize: 24,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        outline:"none",
        padding: 5

    },
    recipientInput: {
        width: "100%",
        fill: "none",
        backgroundColor: "#fff",
        height: 75,
        borderTop: "0.1px solid",
        fontSize: 24,
        borderRadius: 4,
        outline:"none",
        padding: 5
    },
    currencyInput: {
        width: "100%",
        fill: "none",
        backgroundColor: "#fff",
        height: 75,
        borderLeft: "none",
        borderTop: "0.5px solid",
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        fontSize: 24,
        color: "#fff",
        backgroundColor: "#36466F",
        outline:"none",
    },
    currencySelectInput: {
        border: "none",
    },

    button: {
        backgroundColor: "red",
        width: "100%",
        color: 'white',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        '&:hover': {
            backgroundColor: "red",
        }
    },

}));






export default function Transactions() {
    const classes = useRowStyles();
    const navigate = useNavigate()
    const [processing, setProcessing] = useState(false)
    const [sendingCurrency, setSendingCurrency] = useState("USD")
    const [receivingCurrency, setReceivingCurrency] = useState("NGN")
    const [sentAmount, setSentAmount] = useState("")
    const [receiveAmount, setReceiveAmount] = useState("")
    const [rate, setRate] = useState("")
    const [charge, setCharge] = useState("")
    const [toConvert, setRemainingToConvert] = useState("")
    const [receiver, setRecipient] = useState("")
    const [users, setUser] = useState([])

    console.log(receiver, toConvert, rate, receiveAmount,"receiver")

    const currencyJson = {
        convertion: {d2n: 500, d2e: 0.2, e2n: 600}
    }

    useEffect(() => {

        const getConvertedAmount = async() => {
            
            if(sendingCurrency === "USD" && receivingCurrency === "EUR"){

                const chargeValue = (5/100) * sentAmount
                const RemainingToCOnvert = sentAmount - chargeValue
                const returnedValue = RemainingToCOnvert * currencyJson.convertion.d2e
                setRemainingToConvert(RemainingToCOnvert)
                setCharge(chargeValue)
                setRate(currencyJson.convertion.d2e)
                setReceiveAmount(returnedValue)
            }else if(sendingCurrency === "USD" && receivingCurrency === "NGN"){

                const chargeValue = (5/100) * sentAmount
                const RemainingToCOnvert = sentAmount - chargeValue
                const returnedValue = RemainingToCOnvert * currencyJson.convertion.d2n

                setRemainingToConvert(RemainingToCOnvert)
                setCharge(chargeValue)
                setRate(currencyJson.convertion.d2n)
                setReceiveAmount(returnedValue)
            }else if(sendingCurrency === "EUR" && receivingCurrency === "USD"){
                const chargeValue = (5/100) * sentAmount
                const RemainingToCOnvert = sentAmount - chargeValue
                const returnedValue = RemainingToCOnvert/currencyJson.convertion.d2e
                setRemainingToConvert(RemainingToCOnvert)
                setCharge(chargeValue)
                setRate(currencyJson.convertion.d2e)
                setReceiveAmount(returnedValue)
            }else if(sendingCurrency === "NGN" && receivingCurrency === "USD"){
                const chargeValue = (5/100) * sentAmount
                const RemainingToCOnvert = sentAmount - chargeValue
                const returnedValue = RemainingToCOnvert/currencyJson.convertion.d2n
                setRemainingToConvert(RemainingToCOnvert)
                setCharge(chargeValue)
                setRate(currencyJson.convertion.d2n)
                setReceiveAmount(returnedValue)
            }else if(sendingCurrency === "NGN" && receivingCurrency === "EUR"){
                const chargeValue = (5/100) * sentAmount
                const RemainingToCOnvert = sentAmount - chargeValue
                const returnedValue = RemainingToCOnvert/currencyJson.convertion.e2n
                setRemainingToConvert(RemainingToCOnvert)
                setCharge(chargeValue)
                setRate(currencyJson.convertion.e2n)
                setReceiveAmount(returnedValue)
            }else if(sendingCurrency === "EUR" && receivingCurrency === "NGN"){
                const chargeValue = (5/100) * sentAmount
                const RemainingToCOnvert = sentAmount - chargeValue
                const returnedValue = RemainingToCOnvert * currencyJson.convertion.e2n
                setRemainingToConvert(RemainingToCOnvert)
                setCharge(chargeValue)
                setRate(currencyJson.convertion.e2n)
                setReceiveAmount(returnedValue)
            }else if(sendingCurrency === "EUR" && receivingCurrency === "EUR"){
                setRemainingToConvert(sentAmount)
                setCharge(0)
                setRate(1)
                setReceiveAmount(sentAmount)
            }else if(sendingCurrency === "USD" && receivingCurrency === "USD"){
                setRemainingToConvert(sentAmount)
                setCharge(0)
                setRate(1)
                setReceiveAmount(sentAmount)
            }else if(sendingCurrency === "NGN" && receivingCurrency === "NGN"){
                setRemainingToConvert(sentAmount)
                setCharge(0)
                setRate(1)
                setReceiveAmount(sentAmount)
            }
         
            const users = await getAllUsers()
            setUser(users.data.data.users)

        }
        getConvertedAmount()
    }, [sentAmount,sendingCurrency,receivingCurrency,receiveAmount])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setProcessing(true)
            const res = await MakeTransfer({
                to:receiver,
                srcValue: sentAmount.toString() ,
                trgtValue: receiveAmount.toString(),
                srcCurrency: sendingCurrency,
                trgtCurrency: receivingCurrency,
                exchangeRate: rate.toString()
            });
            if (res.data.responseCode === "00") {
                console.log(res.data, "res.data")
                setProcessing(false)
                ShowMessage(type.DONE, res.data.message);
                navigate('/dashboard')
            }else{
                console.log(res.data)
                setProcessing(false)
                ShowMessage(type.ERROR, res.data.message);

            }
        } catch (err) {
            setProcessing(false)
            ShowMessage(type.ERROR, err.data.message);
            console.log(err)
        }
    }

    

    return (
        <MainLayout>
            <div className={classes.root}>
                <Paper className={classes.paper}>

                    <h2>How much would you like to transfer?</h2>

                   
                            <div className={classes.form}>
                                <div className={classes.inputContainer}>
                                    <div className={classes.sendingInput}>
                                        <input
                                            id="outlined-basic"
                                            type="text"
                                            name="sendingCurrencyAmount"
                                            onChange={(e) => setSentAmount(e.target.value)}
                                            placeholder="You Send"
                                            variant="outlined"
                                            value={sentAmount}
                                            className={classes.amountInput}
                                        />
                                       

                                    </div>
                                    <div className={classes.sendingCurrencyInput}>
                                    <select
                                            name="sendingCurrency"
                                            id="select"
                                            autocomplete="off"
                                            required
                                            
                                            onChange={(e) => setSendingCurrency(e.target.value)}
                                            className={classes.currencyInput}
                                            >
                                            <option value="USD">USD</option>
                                            <option value="NGN">NGN</option>
                                            <option value="EUR">EUR</option>
                                            </select>
                                    </div>
                                </div>


                                <div>
                                    <div>
                                        Charge: {charge}
                                    </div>
                                    <div>Remaining to be converted and sent: {toConvert}</div>
                                    <div>Current rate of convertion: {rate}</div>
                                </div>



                                <div className={classes.inputContainer}>
                                    <div className={classes.receivingInput}>
                                        <input
                                            
                                            type="text"
                                            name="receivingCurrencyAmount"
                                            onChange={(e) => setReceiveAmount(e.target.value)}
                                            placeholder="Recipient Receives"
                                            value={receiveAmount}
                                            className={classes.amountInput}
                                        />
                                       

                                    </div>
                                    <div className={classes.receivingCurrencyInput}>
                                        <select
                                            name="receivingCurrency"
                                            id="select"
                                            autocomplete="off"
                                            required
                                            onChange={(e) => setReceivingCurrency(e.target.value)}
                                            className={classes.currencyInput}
                                            >
                                                <option value="NGN">NGN</option>
                                                <option value="USD">USD</option>
                                                <option value="EUR">EUR</option>
                                            </select>
                                           
                                    </div>
                                </div>

                                <div className={classes.inputContainer}>
                                   
                                    <div className={classes.receiversInput}>
                                        <label>Select Recipient</label>
                                        <select
                                            name="recipient"
                                            id="select"
                                            autocomplete="off"
                                            required
                                            onChange={(e) => setRecipient(e.target.value)}
                                            className={classes.recipientInput}
                                            >
                                                <option value="">Select Recipient</option>
                                            {
                                                users.map(item => (
                                                    <option value={item._id}>{item.name}</option>
                                                ))
                                            }
                                            </select>
                                           
                                    </div>
                                </div>


                                <Button onClick={(e) => handleSubmit(e)} className={classes.button} >
                                    {/* {processing ? (
                                        <Loader
                                            type="TailSpin"
                                            color="#00BFFF"
                                            height={40}
                                            width={40}
                                        />
                                    ) : "Transfer"} */}
                                    Transfer
                                    </Button>

                            </div>
                      

                    <h5> Take me there <span className={classes.signUp} onClick={() => navigate("/dashboard")} >Transactions!</span></h5>

                    <p className={classes.footer}> &copy; 2022 SendMoney Inc | <span className={classes.footerContactUs}>Contact Us</span></p>
                </Paper>
            </div>
        </MainLayout>
    );
}