import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getFollowingPosts } from '../../Actions/User'
import Loader from '../Loader/Loader'
import Post from '../Post/Post'
import User from '../User/User'
import {useAlert} from 'react-alert'
import "./Home.css"
import ProfileInfo from '../ProfileInfo/ProfileInfo'
const Home = () => {
  const dispatch = useDispatch();
 
  const alert = useAlert();

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );

  const { error: likeError, message } = useSelector((state) => state.like);

  useEffect(() => {
    
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
    

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
  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (<>
   
  
    <div className="home">
      <div className="homeleft">
        <div className="profile4">
        <ProfileInfo/> 
        </div>
        <div className="posts">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <div className="empty_state">
 
  <h3 className="dd">No posts</h3>
  <p className="para">There have been no posts in this section yet</p>

</div>
        )}
        </div>
    
       
      </div>
      <div className="homeright">
        Global Users
        {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )}
      </div>
    </div>
    </>
  );
};

export default Home;