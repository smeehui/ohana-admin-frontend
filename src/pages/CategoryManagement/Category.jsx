import { Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { categoryService } from "~/service";
import { columns } from "./categoryTBFormat";
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import { tokens } from "~/theme";
import Header from "~/components/Header";

const Category = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [state, setState] = useState({
    category: [],
  });

  useEffect(() => {
    (async () => {
      try {
        let result = await categoryService.getAllCategory();

        setState({ ...state, category: result });
      } catch (error) {
        toast.error("Lấy dữ liệu thất bại!");
        console.log(error);
      }
    })();
  }, []);

  return (
    <Box m="20px" display={"flex"} flexDirection={"column"}>
      <Header title="Danh sách" />
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
    </Box>
  );
};

export default Category;
