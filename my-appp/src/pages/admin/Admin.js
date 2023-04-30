import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import "./Table.css";
import {
  onSnapshot,
  collection,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import moment from "moment";
import Swal from "sweetalert2";
import { alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  {
    field: "url",
    headerName: "成員",
    width: 220,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.url} alt="avater"></img>
          <div>{params.row.name}</div>
        </div>
      );
    },
  },
  { field: "email", headerName: "email", width: 260 },
  {
    field: "createAt",
    headerName: "創建時間",
    description: "This column has a value getter and is not sortable.",
    width: 220,
    renderCell: (params) => {
      return <div>{moment(params.row.createAt.toDate()).format("LLL")}</div>;
    },
  },
  {
    field: "level",
    headerName: "權限",
    width: 200,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.level}`}>
          {params.row.level}
        </div>
      );
    },
  },
];

function Admin({ isAuth }) {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const numSelected = selected.length;

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const adminRef = collection(db, "users");
  useEffect(() => {
    const unSub = onSnapshot(adminRef, (snapShot) => {
      setRows(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => {
      unSub();
    };
  }, []);

  const CheckUser = async (id) => {
    await updateDoc(doc(db, "users", id), {
      level: "user",
    });
  };
  const mutiCheckUser = () => {
    selected.map((id) => CheckUser(id));
  };
  const deleteUser = (id, email) => {
    Swal.fire({
      title: "確定刪除?",
      text: `永久刪除 ${email} 使用者`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "刪除",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        const del = async () => {
          await deleteDoc(doc(db, "users", id));
        };
        del();
        Swal.fire({
          title: "刪除成功",
          text: `已刪除 ${email} 使用者`,
          icon: "success",
          timer: 1100,
        });
      }
    });
  };
  const deleteMutiUser = () => {
    Swal.fire({
      title: "確定刪除?",
      text: `將永久刪除這 ${numSelected} 位使用者`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "刪除",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        const del = async (id) => {
          await deleteDoc(doc(db, "users", id));
        };
        selected.map((id) => del(id));
        Swal.fire({
          title: "刪除成功",
          text: `已刪除這 ${numSelected} 位使用者`,
          icon: "success",
          timer: 1100,
        });
      }
    });
  };
  const changeLevel = async (id, email) => {
    const { value: level } = await Swal.fire({
      text: `更改 ${email} 使用者之權限`,
      input: "select",
      customClass: {
        input: "form-select wide",
      },
      inputOptions: {
        user: "user",
        money: "money",
        admin: "admin",
      },

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "更改",
      cancelButtonText: "取消",
    });
    const alt = async () => {
      await updateDoc(doc(db, "users", id), {
        level,
      });
    };

    if (level === "user" || level === "money") {
      alt();
      Swal.fire({
        title: "更改成功",
        text: `已更改 ${email} 使用者為  ${level}`,
        icon: "success",
        timer: 1100,
      });
    } else if (level === "admin") {
      Swal.fire({
        title: "確定要變更管理者權限?",
        text: `這將會"移轉"您的管理者權限至${email}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          const change = async () => {
            await updateDoc(
              doc(
                db,
                "users",
                rows.filter((rows) => rows.level === "admin")[0].id
              ),
              {
                level: "user",
              }
            );
          };

          alt();
          change();
          Swal.fire({
            title: "移轉成功",
            text: `已將管理者權限移轉至 ${email} 使用者`,
            icon: "success",
            timer: 1100,
          });
        }
      });
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "選項",
      width: 180,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.level === "unCheck" && (
              <button
                class="btn btn-light"
                onClick={() => {
                  CheckUser(params.row.id);
                }}
              >
                <i class="bi bi-check-lg"></i>
              </button>
            )}
            {params.row.level !== "admin" && (
              <>
                <button
                  class="btn btn-light"
                  onClick={() => {
                    changeLevel(params.row.id, params.row.email);
                  }}
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
                  class="btn btn-light"
                  onClick={() => {
                    deleteUser(params.row.id, params.row.email);
                  }}
                >
                  <i class="bi bi-trash3"></i>
                </button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <center>
      <div style={{ height: 400, width: "90%" }}>
        {
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              ...(numSelected > 0 && {
                bgcolor: (theme) =>
                  alpha(
                    theme.palette.primary.main,
                    theme.palette.action.activatedOpacity
                  ),
              }),
            }}
          >
            {numSelected > 0 && (
              <Typography
                sx={{ flex: "1 1 100%" }}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                {numSelected} selected
              </Typography>
            )}

            {numSelected > 0 && (
              <>
                <Tooltip title="Check">
                  <IconButton onClick={mutiCheckUser}>
                    <i class="bi bi-check-lg"></i>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={deleteMutiUser}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Toolbar>
        }
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          disableColumnMenu
          disableRowSelectionOnClick
          onRowSelectionModelChange={(data) => {
            setSelected(data);
          }}
          isRowSelectable={(params) => params.row.level !== "admin"}
        />
      </div>
    </center>
  );
}
export default Admin;