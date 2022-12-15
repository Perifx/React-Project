import "./newUser.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createUser } from "../../store/reducers/userSlice";

export default function NewUser() {
  const [newUser, setNewUser] = useState({});
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  console.log(newUser);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(newUser));
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form
        className="newUserForm"
        onSubmit={submitHandler}
        onChange={changeHandler}
      >
        <div className="newUserItem">
          <label>Username</label>
          <input name="username" type="text" placeholder="username" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input name="email" type="email" placeholder="email@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input name="password" type="password" placeholder="password" />
        </div>
        <button type="submit" className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}
