import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { GiHamburgerMenu } from "react-icons/gi"
import Avater from "../images/avater.png";
// RESPOSNIVE IMPORT
import { IconButton } from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu';
import { useMediaQuery, useTheme } from "@material-ui/core"
import {FiSettings} from "react-icons/fi"
import {FiLogOut} from "react-icons/fi"
import { Link, useHistory, useNavigate } from "react-router-dom";
import { navigations, Secondnavigations } from "../Routes/navigations"
import {getCurrentUser} from "../BusinessLogic"


const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: "#f4f4f4",
        color: "#36466F"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
            zIndex: 100,
            left: 100,
            top: 100,
            position: 'absolute'
        }
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#36466F"
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        backgroundColor: "#D1E2E3",
        [theme.breakpoints.down('sm')]: {
            zIndex: 1,

        }
    },
    link: {
        textDecoration: "none"
    },
    icon_main: {
        color: "#fff",
        width: "20px"
    },
    name: {
        color: "#fff",
        marginLeft: -12
    },
    listingTwo: {
        marginTop: 200
    },
    logoContainer: {
        width: "50%",
        color: 'white',
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
    },
    logo: {
        width: "30%",
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        border: "1px solid yellow",
        margin: 10
    },
    logoTexttwo: {
        color: "#fff",
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: "14px"
    },
    logoContainer: {
        width: "100%",
        color: "#36466F",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column"
    },

    // RESPONSIVENSESS
    [theme.breakpoints.down('sm')]: {
        appBar: {
            backgroundColor: "#f4f4f4",
            color: "#36466F",
            width: '100%',
            position: 'absolute',
            zIndex: 3
        },
    },

}));

export default function MainLayout({ children }) {
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate();

  
    useEffect(() => {
        const user = localStorage.getItem("send-money");
            setUserInfo(JSON.parse(user))
        
    }, [])

    // Navigations functions
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

    // Navigation states

    const [openDrawer, setOpenDrawer] = useState(false)


    const handleLogout = () => {
        localStorage.removeItem("access-token")
        navigate("/");
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {isMatch ? <IconButton style={{ marginRight: 40 }} onClick={() => setOpenDrawer(!openDrawer)}>
                        <GiHamburgerMenu />
                    </IconButton> : ''}
                </Toolbar>
            </AppBar>

            {openDrawer ? <Drawer
                open={openDrawer}
                transitionDuration={1}
                onClose={() => setOpenDrawer(false)}

                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} >
                    <IconButton style={{ marginRight: 40 }} onClick={() => setOpenDrawer(!openDrawer)}>
                        <GiHamburgerMenu />
                    </IconButton>
                </div>
                <div className={classes.logoContainer}>
                    <div>
                        <img src={Avater} alt="logo" style={{ width: "60%", height: 100, borderRadius: "100%", marginLeft: 30, marginTop: 10 }} />
                    </div>
                    <p>
                        <span className={classes.logoTexttwo}>{userInfo.name}</span>
                    </p>
                </div>
                <Divider />

                <List className={classes.listing}>
                    {
                        navigations.map(item => (
                            <Link to={item.route} className={classes.link}>
                                <ListItem button key={item.name} className={classes.items}>
                                    <ListItemIcon className={classes.icon_main}>{item.mainIcon}</ListItemIcon>
                                    <ListItemText primary={item.name} className={classes.name} />
                                </ListItem>
                            </Link>
                        ))
                    }
                </List>
                <Divider />
                <List className={classes.listingTwo}>

                    <Link to='' className={classes.link} >
                        <ListItem button className={classes.items}>
                            <ListItemIcon className={classes.icon_main}>{<FiSettings size={30}/> }</ListItemIcon>
                            <ListItemText primary='Settings' className={classes.name} />
                        </ListItem>
                    </Link>

                    <Link to="/" className={classes.link} >
                        <ListItem button  className={classes.items} onClick={() => handleLogout()}>
                            <ListItemIcon className={classes.icon_main}>{<FiLogOut size={30}/>}</ListItemIcon>
                            <ListItemText primary="Logout" className={classes.name} />
                        </ListItem>
                    </Link>
                    
                </List>

            </Drawer> : !isMatch ? <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}

                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.logoContainer}>
                    <div >
                        <img src={Avater} alt="logo" style={{ width: "100%", height: 100, borderRadius: "100%", marginTop: 10, marginBottom: -10 }} />
                    </div>
                    <p>
                        <span className={classes.logoTexttwo}>{userInfo.name}</span>
                    </p>
                </div>
                <Divider />
                <List className={classes.listing}>
                    {
                        navigations.map(item => (
                            <Link to={item.route} className={classes.link}>
                                <ListItem button key={item.name} className={classes.items}>
                                    <ListItemIcon className={classes.icon_main}>{item.mainIcon}</ListItemIcon>
                                    <ListItemText primary={item.name} className={classes.name} />
                                </ListItem>
                            </Link>
                        ))
                    }
                </List>
                <Divider />
                <List className={classes.listingTwo}>

                <Link to='' className={classes.link} >
                        <ListItem button className={classes.items}>
                            <ListItemIcon className={classes.icon_main}>{<FiSettings size={30}/> }</ListItemIcon>
                            <ListItemText primary='Settings' className={classes.name} />
                        </ListItem>
                    </Link>

                    <Link to="/" className={classes.link} >
                        <ListItem button  className={classes.items}  onClick={() => handleLogout()}>
                            <ListItemIcon className={classes.icon_main}>{<FiLogOut size={30}/>}</ListItemIcon>
                            <ListItemText primary="Logout" className={classes.name} />
                        </ListItem>
                    </Link>

                </List>
            </Drawer> : ''}


            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
}