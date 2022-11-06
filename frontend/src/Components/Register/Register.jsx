import { Avatar, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, avatar));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, alert]);
  return (
    <>
      <span
        className="headline"
        variant="h2"
        style={{ padding: "2vmax", color: "black" }}
      >
        <Typography
          style={{
            fontSize: "2.5rem",
            fontStyle: "italic",
            fontFamily: "BioRhyme",
          }}
        >
          twick
        </Typography>
      </span>

      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <Avatar
            src={avatar}
            alt="User"
            sx={{ height: "10vmax", width: "10vmax" }}
            style={{ color: "white", backgroundColor: "#1FC193" }}
          />

          <input
            style={{ color: "black", backgroundColor: "#1FC193" }}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <input
            type="text"
            value={name}
            placeholder="Name"
            className="registerInputs"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="registerInputs"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="registerInputs"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="/">
            <Typography>Already Signed Up? Login Now</Typography>
          </Link>

          <Button
            disabled={loading}
            style={{
              color: "white",
              backgroundColor: "#1FC193",
              paddingLeft: "3rem",
              paddingRight: "3rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }}
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
};

export default Register;
