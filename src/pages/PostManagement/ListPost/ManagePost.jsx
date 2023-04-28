import { Box, Stack, useTheme } from "@mui/material";
import { tokens } from "~/theme";
import Header from "~/components/Header";
import { postTableColumns } from "./postTBFormat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import CustomToolbar from "~/pages/PostManagement/ListPost/components/CustomToolbar";
import { postService } from "~/service";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import { PostStatus } from "~/pages/PostManagement/ListPost/constants/PostStatus";
import { useIsMount } from "~/hooks/useIsMount";

const ManagePost = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const apiRef = useGridApiRef();
  useDocumentTitle("Ohana - Quản lý bài viết");

  const [tableState, setTableState] = useState({
    pageSize: 10,
    page: 0,
    rowCount: 0,
    rows: [],
    selectedRows: [],
    currentRow: {},
    isLoading: true,
    forceReload: false,
  });

  const forceReload = useCallback(() => {
    setTableState((prev) => ({ ...prev, forceReload: !prev.forceReload }));
    apiRef.current.setRowSelectionModel([]);
  }, []);

  const toggleLoading = (isLoading) => {
    setTableState({ ...tableState, isLoading: isLoading });
  };

  const addPaginationProperties = (result) => {
    const { totalElements, number, size, content } = result;
    setTableState((prev) => ({
      ...prev,
      rowCount: totalElements,
      pageSize: size,
      page: number,
      rows: content,
      isLoading: false,
    }));
  };

  const handleProcessRowUpdateError = async (event) => {
    toast.error("Chỉnh sửa thất bại!");
  };

  const handleFilter = useCallback(async (filter={keyword: ""}) => {
    try {
      toggleLoading(true);
      setTableState({ ...tableState, isLoading: true });
      let result = await postService.filterPosts(filter, {
        page: tableState.page,
        size: tableState.pageSize,
      });
      addPaginationProperties(result);
    } catch (err) {
      console.log(err);
      toast.error("Lọc thất bại!")
    }
  }, []);

  const slots = useMemo(
    () => ({
      toolbar: () => (
        <CustomToolbar
          selectedRows={tableState.selectedRows}
          handleFilter={handleFilter}
          forceReload={forceReload}
        />
      ),
      noRowsOverlay: () => (
        <Stack
          fontSize={18}
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          Không tìm thấy kết quả
        </Stack>
      ),
    }),
    [tableState.selectedRows, tableState.forceReload]
  );
  return (
    <Box m="20px" display={"flex"} flexDirection={"column"}>
      <Header title="Danh sách bài viết" />
      <Box
        flex={"1"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-cell:hover": {
            cursor: "pointer",
          },
          "& .MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
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
        <DataGrid
          apiRef={apiRef}
          columns={postTableColumns}
          {...tableState}
          initialState={{
            ...tableState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          isCellEditable={({ value }) =>
            value !== PostStatus.DELETED && value !== PostStatus.OVER_ROOM
          }
          autoHeight
          slots={slots}
          pagination
          loading={tableState.isLoading}
          // processRowUpdate={handleChangeStatus}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          rowSelection
          pageSizeOptions={[10, 20, 50, 100]}
          onPaginationModelChange={(paginationModel) =>
            setTableState((prev) => ({
              ...prev,
              ...paginationModel,
            }))
          }
          onRowEditStart={(row) =>
            setTableState((prev) => ({
              ...prev,
              currentRow: row,
            }))
          }
          filterMode="server"
          checkboxSelection
          paginationMode="server"
          resizable
          onFilterModelChange={handleFilter}
          onRowSelectionModelChange={(rows) =>
            setTableState((prev) => ({
              ...prev,
              selectedRows: [
                ...rows.map((row) =>
                  tableState.rows.find((tRow) => tRow.id === row)
                ),
              ],
            }))
          }
        />
      </Box>
    </Box>
  );
};

export default ManagePost;
