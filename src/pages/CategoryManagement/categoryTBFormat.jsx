import {Edit, VisibilityOffOutlined, VisibilityOutlined,} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormHelperText,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {CategoryTableConText} from "./Category";
import {categoryService} from "~/service";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import * as Yup from "yup";
import {CategoryStatus} from "./categoryConstant";

// import { UtilTableContext } from '~/pages/UtilityManagement/ManageUtility';

function ActionButton({ row }) {
  const [state, setState] = useState({
    open: false,
    category: {},
    forceReload: false,
  });

  const contextValues = useContext(CategoryTableConText);

  const { open, category } = state;

  const handleChangeStatus = async () => {
    const { id, status } = row;
    const result = await categoryService.findById(id);
    setState({
      ...state,
      isDelModalOpen: true,
      category: result,
      cateModifyingStatus:
        status === CategoryStatus.SHOW
          ? CategoryStatus.HIDDEN
          : CategoryStatus.SHOW,
    });
  };

  const handleSubmitChangeStatus = async () => {
    try {
        let result = await categoryService.updateStatusCategory(state.category.id, state.cateModifyingStatus)
        setState({
            ...state,
            isModalOpen: false,
            isDelModalOpen: false,
            utility: result
        });
        contextValues.setState({
          ...contextValues.state,
          forceReload: !contextValues.state.forceReload,
        });
        toast.success("Đã " + (state.cateModifyingStatus === CategoryStatus.SHOW ? "hiển thị" : "ẩn") + " tiện ích thành công!")
    } catch (e) {
        console.log(e);
        toast.error("Thay đổi trạng thái tiện ích thất bại!")
    }
};

const handleChangeStatusClose = () => {
  formik.resetForm();
  setState({
      ...state,
      isModalOpen: false,
      isDelModalOpen: false
  });
};

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, "Tối thiểu 2 ký tự")
        .max(50, "Tối đa 50 ký tự")
        .required("Danh mục không được để trống!"),
    }),

    onSubmit: async (value) => {
      try {
        const { id } = row;
        value.id = id;

        const result = await categoryService.updateCategoryTitle(value);

        setState({
          ...state,
          open: false,
          category: {},
          forceReload: !state.forceReload,
        });
        contextValues.setState({
          ...contextValues.state,
          forceReload: !contextValues.state.forceReload,
        });

        toast.success(`Cập nhật thành công`);
        formik.resetForm();
      } catch (error) {
        toast.error(`Cập nhật thất bại`);
      }
    },
  });

  const titleError = formik.touched.title && formik.errors.title;

  useEffect(() => {
    formik.setFieldValue("title", state.category.title);
  }, [state.category]);

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const onChange = (e) => {
    setState({
      ...state,
      category: { ...state.category, title: e.target.value },
    });
  };

  const handleEdit = async () => {
    const { id } = row;

    const result = await categoryService.findById(id);

    setState({
      ...state,
      open: true,
      category: result,
    });
  };

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
      <Stack spacing={1} direction="row">
        <Button
          onClick={handleEdit}
          size="small"
          variant="contained"
          color="warning"
        >
          <Edit /> Sửa
        </Button>

        {row.status === CategoryStatus.SHOW ? (
          <Button
            onClick={handleChangeStatus}
            size="small"
            variant="contained"
            color="error"
            value={CategoryStatus.HIDDEN}
            sx={{ minWidth: 70 }}
          >
            <VisibilityOffOutlined /> Ẩn
          </Button>
        ) : (
          <Button
            onClick={handleChangeStatus}
            size="small"
            variant="contained"
            color="success"
            value={CategoryStatus.SHOW}
            sx={{ minWidth: 70 }}
          >
            <VisibilityOutlined /> Hiện
          </Button>
        )}
      </Stack>

      <Dialog
        open={
          state.isDelModalOpen === undefined
            ? false
            : state.isDelModalOpen
        }
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <h4>
            {`Bạn có chắc chắn muốn ${
              state.cateModifyingStatus === CategoryStatus.SHOW
                ? "hiện"
                : "ẩn"
            } `}
            {" danh mục "}
            {
              <span className={"mx-1"}>
                <i className={state.category.icon + " mx-1"}></i>
                {state.category.title}
              </span>
            }
            {"?"}
          </h4>

          <Stack direction="row" spacing={1}></Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleChangeStatusClose()}
          >
            Huỷ
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSubmitChangeStatus()}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" gutterBottom>
            Chỉnh sửa danh mục
          </Typography>

          <Stack
            component={"form"}
            onSubmit={formik.handleSubmit}
            sx={{ marginBottom: "20px" }}
          >
            <TextField
              sx={{ mt: 2 }}
              onChange={formik.handleChange}
              value={formik.values.title}
              label="Tên danh mục"
              name="title"
              variant="standard"
              error={titleError}
              helperText={
                titleError && (
                  <FormHelperText sx={{ fontSize: 12 }}>
                    {formik.errors.title}
                  </FormHelperText>
                )
              }
            />
          </Stack>

          <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
            <Button
              onClick={formik.handleSubmit}
              type="submit"
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
    </>
  );
}

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerAlign: 'center',
    align: 'center',
    width: 60,
  },
  {
    field: "title",
    headerName: "Danh mục",
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: "status",
    headerName: "Trạng thái",
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({row}) => row.status === CategoryStatus.HIDDEN ? "Đã ẩn" : "Đang hiển thị",
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: ({ row }) => <ActionButton row={row} key={row.title} />,
    headerAlign: 'center',
    align: 'center',
  },
];

export { columns };
