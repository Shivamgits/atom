import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import "./ForgotPassword.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
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
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h4" style={{ padding: "2vmax",fontSize:"2rem", fontStyle: "bold" }}>
          Check Your MailBox
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={loading} type="submit"
         style={{color:"white",backgroundColor:"#1FC193"
         ,paddingLeft:"3rem",
         paddingRight:"3rem",
         paddingTop:"0.5rem",
         paddingBottom:"0.5rem"}}
        >
          Send Token
        </Button>
      </form>
    </div>
    </>
  );
};

export default ForgotPassword;