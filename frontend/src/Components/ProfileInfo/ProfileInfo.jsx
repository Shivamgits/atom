import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {  getMyPosts } from "../../Actions/User";

import "./profileInfo.css";

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
 
  const { user,  } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.myPosts);
  const {
    error: likeError,
    message,
   
  } = useSelector((state) => state.like);
   
 

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, likeError, dispatch]);

 
  
 
  return (
    <div>
<div className="card">
    <div className="img">
    <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
    </div>
    <div className="infos">
      <div className="name">
        <h2>{user.name}</h2>
        <h4>{user.country}</h4>
        {/* <h4>{age}</h4> */}
       
      </div>
      
      <ul className="stats">
        <li>
          <h3>{user.followers.length}</h3>
          <h4>Followers</h4>
        </li>
        <li>
          <h3>{user.following.length}</h3>
          <h4>Following</h4>
        </li>
        <li>
          <h3>{user.posts.length}</h3>
          <h4>Posts</h4>
        </li>
      </ul>
      <h5> Welcome To Atom </h5>
     
    </div>
  </div>
</div>
  )
}

export default ProfileInfo