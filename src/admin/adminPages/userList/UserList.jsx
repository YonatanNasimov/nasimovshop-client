import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers ,deleteUser} from '../../../features/apiCalls';
import "./userList.css";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    getUsers(dispatch)
  }, [dispatch])

  const handleDelete = (id) => {
    deleteUser(dispatch,id)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img_url || "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"} alt={params.row.username }/>
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "email", width: 200 },
    {
      field: "phone",
      headerName: "phone",
      width: 120,
    },
    {
      field: "role",
      headerName: "role Volume",
      width: 160,
    },
    {
      field: "active",
      headerName: "active",
      width: 150,

      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => window.confirm(`are you sure you want to delete user ${params.row.username} ?`) && handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId = {(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
