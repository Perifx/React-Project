import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../store/reducers/requestMethods";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users?new=true");
        console.log(res.data);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);
  console.log(users);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users &&
          users.map((item) => (
            <li className="widgetSmListItem">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{item.username}</span>
                <span className="widgetSmUserTitle">{item.email}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
