import { Avatar, Typography, Button, Select, MenuItem, Input, InputLabel, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateProfile.css";
import { loadUser, updateProfile } from "../../Actions/User";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import countries from "i18n-iso-countries";
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";


const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);

  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user.gender);
  const [country, setCountry] = useState(user.country);
  const [birthYear, setBirth] = useState(user.birthYear);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

  const dispatch = useDispatch();
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);

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


  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name,gender,country,birthYear, email, avatar));
    dispatch(loadUser());
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

    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, alert, updateError, message]);
  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h4" style={{ padding: "2vmax" }}>
         Update Profile
        </Typography>

        <Avatar
          src={avatarPrev}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="updateProfileInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />
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
          className="updateProfileInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={updateLoading}
        style={{backgroundColor:"#1FC193",color:"white"}}
        type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;