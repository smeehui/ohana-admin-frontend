import React, { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { categoryService } from "~/service";
import { columns } from "./categoryTBFormat";
import { DataGrid } from "@mui/x-data-grid";
import {
  Alert,
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "~/theme";
import Header from "~/components/Header";
import { Add } from "@mui/icons-material";
import { Formik } from "formik";

export const CategoryTableConText = createContext();

const Category = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [state, setState] = useState({
    open: false,
    category: [],
    cate: "",
    forceReload: false,
  });

  const { open } = state;

  const handleAdd = () => {
    setState({
      ...state,
      open: true,
    });
  };

  const handleSubmit = async () => {
    try {
      const result = await categoryService.addNewCategory(state.cate);
      console.log(result);

      setState({
        ...state,
        open: false,
        cate: "",
        forceReload: true,
      });

      toast.success(`Thêm mới thành công`);
    } catch (error) {
      toast.error(`Thêm mới thất bại`);
    }
  };

  const onChange = (e) => {
    setState({
      ...state,
      cate: e.target.value,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
      cate: "",
    });
  };

  useEffect(() => {
    (async () => {
      try {
        let result = await categoryService.getAllCategory();

        setState({ ...state, category: result });
      } catch (error) {
        toast.error("Lấy dữ liệu thất bại!");
      }
    })();
  }, [state.forceReload]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <CategoryTableConText.Provider value={{ state, setState }}>
        <Box m="20px" display={"flex"} flexDirection={"column"}>
          <Stack sx={{ height: "35px" }} mb={2} direction="row" spacing={105}>
            <Header title="Danh mục phòng" />
            <Button
              onClick={handleAdd}
              size="small"
              variant="contained"
              color="success"
            >
              <Add />
              Thêm mới
            </Button>
          </Stack>

          <Box
            flex={"1"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid columns={columns} autoHeight rows={state.category} />
          </Box>

          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h3" gutterBottom>
                Thêm danh mục mới
              </Typography>

              <Stack sx={{ marginBottom: "20px", marginTop: "30px" }}>
                <Formik
                  initialValues={{ value: "" }}
                  onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    alert(JSON.stringify(values, null, 1));
                  }}
                >
                  <Stack direction="column" spacing={1}>
                    <Alert
                      variant="outlined"
                      severity="error"
                    >
                      Tên danh mục đã tồn tại!
                    </Alert>
                    <TextField
                      onChange={onChange}
                      value={state.cate}
                      label="Title"
                      variant="outlined"
                      // error
                      // id="outlined-error-helper-text"
                      // helperText="Incorrect entry."
                    />
                  </Stack>
                </Formik>
              </Stack>

              <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
                <Button
                  onClick={handleSubmit}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Xác nhận
                </Button>

                <Button
                  onClick={handleClose}
                  size="small"
                  variant="contained"
                  color="error"
                >
                  Hủy
                </Button>
              </Stack>
            </Box>
          </Modal>
        </Box>
      </CategoryTableConText.Provider>
    </>
  );
};

export default Category;
