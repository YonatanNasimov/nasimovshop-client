import React, { useEffect } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import "./topbar.css";

export default function Topbar() {
  const nav = useNavigate();
  const user = useSelector(state => state.user.currentUser.user)

  useEffect(() => {
    onCheck();
  }, [user.role])

  const onCheck = () => {
    if (user.role != "admin") {
      nav("/")
      toast.error(`hello ${user.username} You are not allowed to be in this area`)
    }
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span onClick={() => nav("/admin")} className="logo">A D M I N</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">0</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">0</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
          <img src={user.img_url || "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"} alt={user.username} className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
