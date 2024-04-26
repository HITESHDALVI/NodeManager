import React from "react";
import "./Header.css";
import logo from "../../assets/33513193_8063096 2.png";
import { HiMenu } from "react-icons/hi";
import { MdOutlinePersonPin } from "react-icons/md";

type Props = {};

const Header = (props: Props) => {
  return (
    <ul className="navbar">
      <li className="navbarOptions">
        <img src={logo} className="logo" />
      </li>
      <li className="navbarOptions">
        <a className="options" href="news.asp">
          <h1>My Notes</h1>
        </a>
      </li>
      <li className="navbarOptions">
        <input placeholder="Search..." className="search" />
      </li>
      <li
        className="navbarOptions"
        style={{
          display: "flex",
          alignSelf: "center",
          right: 0,
          position: "absolute",
        }}
      >
        <div className="profile">
          <div className="userName">Hitesh</div>
          <MdOutlinePersonPin size={28} color="#B4BDFF" />
          <HiMenu size={22} className="menu" />
        </div>
      </li>
    </ul>
  );
};

export default Header;
