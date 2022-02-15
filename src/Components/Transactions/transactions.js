import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import moment from "moment"

import { AiFillDollarCircle } from "react-icons/ai"
import { AiFillEuroCircle } from "react-icons/ai"
import { FaHashtag } from "react-icons/fa"
import { MdDeleteForever, MdModeEdit } from "react-icons/md"
import MainLayout from '../DashboardLayout';
import Card from "../Card/card"
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getAllTransactions } from "../../BusinessLogic"
import { TailSpin } from  'react-loader-spinner'

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
      borderTop: "1px solid rgba(224, 224, 224, 1)",
    },
  },
  tableHead: {
    color: "#fff",
    backgroundColor: "#36466F"

  },
  value: {
    color: "green"
  },
  cardContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 50,
    [theme.breakpoints.down('sm')]: {
      display: "flex",
      width: '100%',
      flexDirection: 'column',
    },
  },
  titleContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  createBtn: {
    padding: "0px 5px 0px 5px",
    height: 50,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#36466F",
    border: "none",
    borderRadius: 7,
    color: "#fff",
    cursor: "pointer"
  }
}));



function Row(props) {
  const { row, index, userInfo } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          <TableCell >{index}</TableCell>
        </TableCell>
        <TableCell >{row.sender !== null ? row.sender.name : (<span style={{ color: "red" }}>Transfer<span style={{ color: "#36466F" }}>Zone</span></span>)}</TableCell>
        <TableCell >{row.receiver.name}</TableCell>
        <TableCell className={classes.value}>{row.receiver._id === userInfo._id ? (<span style={{ color: "green" }}>+{(Math.round(row.amount * 100) / 100).toFixed(2)}</span>) : (<span style={{ color: "red" }}>-{(Math.round(row.srcAmount * 100) / 100).toFixed(2)}</span>)}</TableCell>
        <TableCell >{row.receiver._id === userInfo._id ? row.targetCurrency : row.sourceCurrency}</TableCell>
        <TableCell >{moment(row.createAt).format("YYYY-MM-DD")}</TableCell>
        <TableCell >{moment(row.updatedAt).format("YYYY-MM-DD")}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}



export default function Transactions() {
  const classes = useRowStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({})
  const [transactions, setTransactions] = useState([])


  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser()
      const transactions = await getAllTransactions()
      setTransactions(transactions.data.data.transactions)
      setUserInfo(user.data.data.user)
    }
    getUser()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const cardInfo = [
    {
      currency: "NGN",
      total: userInfo.ngnTotal,
      icon: <FaHashtag size={70} color="#36466F" />
    },
    {
      currency: "USD",
      total: userInfo.usdTotal,
      icon: <AiFillDollarCircle size={70} color="#36466F" />
    },
    {
      currency: "EUR",
      total: userInfo.eurTotal,
      icon: <AiFillEuroCircle size={70} color="#36466F" />
    }
  ]


  return (
    <MainLayout>
      {
        transactions.length ? (
          <>
            <div className={classes.cardContainer}>
              {
                cardInfo.map(item => (
                  <Card item={item} />
                ))
              }
            </div>
            <div className={classes.titleContainer}>
              <h1>Transactions</h1>
              <button className={classes.createBtn} onClick={() => navigate("/dashboard/create")}>New Transaction</button>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHead}>ID</TableCell>
                    <TableCell className={classes.tableHead} >From</TableCell>
                    <TableCell className={classes.tableHead} >To</TableCell>
                    <TableCell className={classes.tableHead} >Value</TableCell>
                    <TableCell className={classes.tableHead} >Currency</TableCell>
                    <TableCell className={classes.tableHead} >Created_at</TableCell>
                    <TableCell className={classes.tableHead} >Updated_at</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                      <Row key={row.name} row={row} index={index} userInfo={userInfo} />
                    );
                  })}

                </TableBody>
              </Table>

              <TablePagination
                rowsPerPageOptions={[3, 10, 30]}
                component="div"
                count={transactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </>
        ): (
      <div style={{width:"50%",marginLeft: "25%", marginTop:"25%", marginBottom:"23%",justifyContent:"center", alignItems:"center", display:"flex" }}>
        <TailSpin
        heigth="100"
        width="100"
        color='red'
        ariaLabel='loading'
      />
      </div>
      )
    }

    </MainLayout>


  );
}