import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  return (
    <>
    <span className="headline" variant="h2" style={{ padding: "2vmax" ,color: "black"  }}>
       <Typography style={{ fontSize:"2.5rem", fontStyle: "italic",fontFamily: 'BioRhyme'}}>twick</Typography> 
      </span>
 
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Sign In
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>

        <Button type="submit"
         style={{color:"white",backgroundColor:"#1FC193"
         ,paddingLeft:"3rem",
         paddingRight:"3rem",
         paddingTop:"0.5rem",
         paddingBottom:"0.5rem"}}
        >Login</Button>

        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
    </>
  );
};

export default Login;