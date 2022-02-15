import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";



//Pages
import Login from "../Components/Login/login";
import SignUp from "../Components/SignUp/signup";
import Transactions from "../Components/Transactions/transactions";
import Create from "../Components/CreateTransactions/create";
import { getCurrentUser } from "../BusinessLogic"



export default function Views() {
  const [authed, setAuthed] = useState(false)



  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser()
      console.log(user.data, "from toute")

      if (user.data === "Session expired! Login to continue" || user.data === "login to ctoninue") {
        setAuthed(false)
      } else {
        setAuthed(true)
      }

    }
    getUser()
  }, [])

  return (

    <div style={{ height: "100vh" }}>
      <Router>
        <Routes>
          {/* Public routes */}

          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />

          {/* Protected routes */}

          <Route exact path='/dashboard' element={authed ? (<Transactions />) : (<Navigate to="/" />)} />
          <Route exact path='/dashboard/create' element={authed ? (<Create />) : (<Navigate to="/" />)} />


        </Routes>
      </Router>
    </div>
  );
}