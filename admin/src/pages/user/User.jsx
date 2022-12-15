import { CalendarToday, MailOutline, Publish } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import "./user.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserById, udpateUsers } from "../../store/reducers/userSlice";
import { format } from "timeago.js";
import { useState } from "react";

export default function User() {
  const [updatedUser, setUpdatedUser] = useState({});
  const { userId } = useParams();
  const userById = useSelector((state) => state.user.userById);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeHandler = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };
  console.log(updatedUser);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(udpateUsers({ userId, updatedUser }));
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{userById.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                {format(userById.createdAt)}
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{userById.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form
            className="userUpdateForm"
            onSubmit={submitHandler}
            onChange={changeHandler}
          >
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder={userById.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={userById.email}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button type="submit" className="userUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
