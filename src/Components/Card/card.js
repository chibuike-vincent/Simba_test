import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {IoIosPeople} from "react-icons/io"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down('sm')]: {
            display: "flex",
            width: '100%',
            flexDirection:'column',
        },
    },

    
    cardContainer: {
        width: "30%",
        borderRadius:10,
        boxShadow: "0px 2px 2px 0px gray",
        backgroundColor: "green",
        height: 170,
        [theme.breakpoints.down('sm')]: {
            width: "95%",
            marginBottom: 10,
            height: 140,
            alignSelf: "center",
            
        },
    },
    innerCardContainer: {
        width: "98%",
        height: "100%",
        borderRadius:10,
        backgroundColor: "white",
        float:"right"
    },
    count: {
        minWidth: "20%", 
        height: 50, 
        margin: 10, 
        borderRadius:100, 
        textAlign:"center", 
        border:"1px solid #36466F", 
        color: "#36466F"
    },
    image_countContainer: {
        display: "flex", 
        marginTop: 30, 
        justifyContent:"space-between",
        
    },
    title: {
        color: "#36466F", 
        textAlign:"center"
    },
    countTotal:{
        fontWeight: "bold",
        fontSize: 14
    }
  }));

function Card({item}) {
    const classes = useStyles();
    return (
        <div className={classes.cardContainer} >
                <div className={classes.innerCardContainer}>
                    <h2 className={classes.title}>Total {item.currency}</h2>
                    <div className={classes.image_countContainer}>
                    {item.icon}
                    <div className={classes.count}>
                        <p className={classes.countTotal}>{(Math.round(item.total * 100)/100).toFixed(2)}</p>
                    </div>
                    </div>
            </div>
        </div>
    )
}

export default Card