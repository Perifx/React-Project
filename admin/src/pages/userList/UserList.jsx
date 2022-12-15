import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsersList, deleteUser } from "../../store/reducers/userSlice";
import { CircularProgress } from "@material-ui/core";

export default function UserList() {
  const { users, isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    dispatch(getUsersList());
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.avatar ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      {isLoading && <CircularProgress />}
      {error && (
        <div className="error">{`${error}.. Please try again later..`}</div>
      )}
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
