import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "timeago.js";
import { doApiMethod, server_url } from "../../../services/apiServices";
import UpdateUser from '../../adminComps/updateUser';
import { toast } from 'react-toastify';
import "./user.css";

export default function User() {
  const params = useParams();
  const nav = useNavigate();
  const userId = params["userId"];
  const user = useSelector((state) =>
    state.user.users.find((user) => user._id === userId)
  );

  const onRoleClick = async () => {
    let bodyData;
    if (user._id != "637915e9d7ddb71f61a2f71d") {
      if (user.role == "user") {
        bodyData = { role: "admin" }
      }
      else if (user.role == "admin") {
        bodyData = { role: "user" }
      }
    }

    let url = server_url + "/users/changeRole/" + user._id;
    try {
      let resp = await doApiMethod(url, "PATCH", bodyData)
      if (resp.data) {
        nav("/admin/users")
      }
    }
    catch (err) {
      console.log(err.response);
      toast.error("There problem, or you try to change superAdmin to user");
    }
  }
  const onActiveClick = async () => {
    let bodyData;
    if (user._id != "637915e9d7ddb71f61a2f71d") {
      if (user.active) {
        bodyData = { active: false }
      }
      else if (!user.active) {
        bodyData = { active: true }
      }
    }

    let url = server_url + "/users/active/changeActive/" + user._id;
    try {
      let resp = await doApiMethod(url, "PATCH", bodyData)
      if (resp.data) {
        nav("/admin/users")
      }
    }
    catch (err) {
      console.log(err.response);
      toast.error("There problem, or you try to change superAdmin to user");
    }
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/signup">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.img_url || "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"}
              alt={user.username}
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUsername">{user._id}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{format(user.createdAt)}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <span className="userShowTitle">Change role by click</span>
            <div className="userShowInfo">
              <button onClick={onRoleClick} className="roleButtom">
                {user.role}
              </button>
            </div>
            <span className="userShowTitle">Change role by click</span>
            <div className="userShowInfo">
              <button onClick={onActiveClick} className="roleButtom">
                {user.active.toString()}
              </button>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <UpdateUser/>
        </div>
      </div>
    </div>
  );
}
