import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, FormHelperText, Input, Modal, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Category, { CategoryTableConText } from "./Category";
import { categoryService } from "~/service";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

function ActionButton({ row }) {
  const [state, setState] = useState({
    open: false,
    category: {},
    forceReload: false,
  });

  const contextValues = useContext(CategoryTableConText);

  const { open, category } = state;

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

        const {id} = row;
        value.id = id;

        const result = await categoryService.updateCategoryTitle(value);
  
        setState({
          ...state,
          open: false,
          category: {},
          forceReload: !state.forceReload,
        });
        contextValues.setState({...contextValues.state,forceReload: !contextValues.state.forceReload})
  
        toast.success(`Cập nhật thành công`);
        formik.resetForm();
      } catch (error) {
        toast.error(`Cập nhật thất bại`);
      }
    },
  });

  const titleError = formik.touched.title && formik.errors.title;

  
  useEffect(()=>{
    formik.setFieldValue("title", state.category.title)
  },[state.category])

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
          <Edit /> Chỉnh sửa
        </Button>

        <Button
          onClick={handleEdit}
          size="small"
          variant="contained"
          color="error"
        >
          <Delete /> Xóa
        </Button>
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" gutterBottom>
            Chỉnh sửa danh mục
          </Typography>

          <Stack component={"form"} onSubmit={formik.handleSubmit} sx={{ marginBottom: "20px" }}>
            <Input
              sx={{ mt: 2 }}
              onChange={formik.handleChange}
              value={formik.values.title}
              label="Title"
              name="title"
              variant="outlined"
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
  },
  {
    field: "title",
    headerName: "Danh mục",
    flex: 1,
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: ({ row }) => <ActionButton row={row} key={row.title} />,
  },
];

export { columns };
