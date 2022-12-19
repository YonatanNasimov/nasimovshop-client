import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect } from 'react';
import { useState } from 'react';
import { doApiGet, server_url } from '../../../services/apiServices';
import "./widgetSm.css";


export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let url = server_url + "/users/usersList/?new=true";
    try {
      let resp = await doApiGet(url);
      setUsers(resp.data);
    }
    catch (err) {
      console.log(err.response);
      alert("There problem try come back later")
    }
  }

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users?.map((item) => {
          return (
            <li key={item._id} className="widgetSmListItem">
              <img
                src={item.img_url || "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"}
                alt={`picture of ${item.username}`}
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{item.username}</span>
              </div>
              <button className="widgetSmButton">
                <VisibilityIcon className="widgetSmIcon" />
                Display
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
