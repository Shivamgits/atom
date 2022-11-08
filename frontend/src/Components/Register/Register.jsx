import { Avatar, Typography, Button, MenuItem, Select, FormControl, InputLabel, Input } from "@mui/material";
import React, { useEffect, useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";
import countries from "i18n-iso-countries";
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";

const Register = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [birthYear, setBirth] = useState("");
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
  const selectCountryHandler = (value) => setCountry(value);
  // Have to register the languages you want to use
  countries.registerLocale(enLocale);
  countries.registerLocale(itLocale);

  // Returns an object not a list
  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key
    };
  });



  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name,gender,country,birthYear, email, password, avatar));
  };


  const generateYearOptions = () => {
    const arr = [];
  
    const startYear = 1900;
    const endYear = new Date().getFullYear();
  
    for (let i = endYear; i >= startYear; i--) {
      arr.push(<option value={i}>{i}</option>);
    }
  
    return arr;
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
          Atom
        </Typography>
      </span>

      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <Avatar
            src={avatar}
            alt="User"
            sx={{ height: "10vmax", width: "10vmax" }}
            style={{ color: "white", backgroundColor: "#0C67C2" }}
          />

          <input
            style={{ color: "black", backgroundColor: "#0C67C2" }}
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
{/* 
          <div className="radio">
        <div className="radio1">Gender</div>
        <div className="radio3" value={gender} onChange={(e) => setGender(e.target.value)}>
         
        <input className="radio2" type="radio" value="Male" name="gender" required /> Male
        <input className="radio2" type="radio" value="Female" name="gender" required /> Female
        <input className="radio2" type="radio" value="Other" name="gender" required /> Other
      </div>
        </div> */}
          <FormControl  className="registerInputs">
    <InputLabel htmlFor="name-multiple">Gender</InputLabel>
<Select
       style={{marginBottom: "20px"}}
        
        value={gender}
       
        input={<Input id="name-multiple" />}
        onChange={(e) => setGender(e.target.value)}
      >
         <MenuItem value="Male">Male</MenuItem>
    <MenuItem value="Female">Female</MenuItem>
    <MenuItem value="Other">Other</MenuItem>
      </Select>
      </FormControl>
       
        <FormControl  className="registerInputs">
    <InputLabel htmlFor="name-multiple">Country</InputLabel>
<Select
       
        
        value={country}
        placeholder="Country"
        input={<Input id="name-multiple" />}
        onChange={(e) => selectCountryHandler(e.target.value)}
      >
        {!!countryArr?.length &&
          countryArr.map(({ label, value }) => (
            <MenuItem key={label} value={value}>
              {label}
            </MenuItem>
          ))}
      </Select>
      </FormControl>

        
<select
  className='registerInputs'
  name='BirthYear'
  onChange={(e) => setBirth(e.target.value)}
  value={birthYear}
>
  <option value='0'>Year</option>
  {generateYearOptions()}
</select>

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
              backgroundColor: "#0C67C2",
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
