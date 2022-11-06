import React, { useState } from 'react'
import "./Header.css";
import { Link } from 'react-router-dom'
import {
  Home,
  HomeOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';

const Header = () => {
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="header">
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? <WidgetsOutlinedIcon style={{ color: "black" }} /> : <WidgetsOutlinedIcon />}
      </Link>

      <Link to="/newpost" onClick={() => setTab("/newpost")}>
        {tab === "/newpost" ? (
          <AddAPhotoIcon style={{ color: "black" }} />
        ) : (
          <AddAPhotoOutlinedIcon />
        )}
      </Link>

      <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? (
          <Search style={{ color: "black" }} />
        ) : (
          <SearchOutlined />
        )}
      </Link>

      <Link to="/account" onClick={() => setTab("/account")}>
       
        {tab === "/account" ? (
          <AccountCircle style={{ color: "black" }} />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>
    </div>
  );
};

export default Header;