import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Input, Modal, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Category, { CategoryTableConText } from "./Category";
import { categoryService } from "~/service";
import { toast } from "react-toastify";
import { useGridApiContext, useGridApiRef } from "@mui/x-data-grid";
import { Form } from "react-router-dom";

function ActionButton({ row }) {
  const [state, setState] = useState({
    open: false,
    category: {},
  });

  const contextValues = useContext(CategoryTableConText)

  console.log(contextValues);

  const gridApi = useGridApiContext();
  const { open, category } = state;

  const handleSubmit = async () => {
    try {
      const result = await categoryService.updateCategoryTitle(category);

      setState({
        ...state,
        open: false,
        category: result,
      });

      toast.success(`Cập nhật thành công`);

     contextValues.setState(prev=>{
      return {...prev ,forceReload: !prev.forceReload}
     })
    } catch (error) {
      toast.error(`Cập nhật thất bại`);
      console.log(error);
    }
  };

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

          <Stack sx={{ marginBottom: "20px" }}>
            <Input
              onChange={onChange}
              value={state.category.title}
              sx={{ mt: 2 }}
            />
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
