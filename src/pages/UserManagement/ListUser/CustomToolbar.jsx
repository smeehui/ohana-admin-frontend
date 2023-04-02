import { useTheme } from "@emotion/react";
import { FilterAltSharp, Remove } from "@mui/icons-material";
import { Button, MenuItem, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { memo, useCallback, useEffect, useState } from "react";
import useDebounce from "~/hooks/useDebounce";
import { useIsMount } from "~/hooks/useIsMount";
import { tokens } from "~/theme";

function CustomToolbar({ selectedRows, handleFilter }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const toolStyle = { color: colors.greenAccent[300] };
    const [filterParams, setFilterParams] = useState({
        keyword: "",
        status: undefined,
        role: undefined,
    });

    const isMounted = useIsMount();

    const debouncedFilter = useDebounce(filterParams, 500);

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const handleChange = (e) => {
        if (e.target.value === "#") return filterParams;
        setFilterParams((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    useEffect(() => {
        if (!isMounted) handleFilter(filterParams);
    }, [debouncedFilter]);
    return (
        <GridToolbarContainer className="d-flex justify-content-between">
            <div>
                <GridToolbarColumnsButton style={toolStyle} />
                <GridToolbarDensitySelector style={toolStyle} />
            </div>
            <form className="flex-grow-1 d-flex" onSubmit={handleSubmit}>
                <Stack
                    justifyContent={"flex-end"}
                    display={"flex"}
                    direction={"row"}
                    flex={1}
                    spacing={2}
                >
                    <TextField
                        name="keyword"
                        variant="standard"
                        onChange={handleChange}
                        value={filterParams.keyword}
                    />
                    <TextField
                        select
                        variant="standard"
                        defaultValue={"#"}
                        sx={{ minWidth: 120 }}
                        title="Lọc theo trạng thái"
                        onChange={handleChange}
                        name="status"
                        value={filterParams.status || "#"}
                    >
                        <MenuItem value="#">
                            <em>Trạng thái</em>
                        </MenuItem>
                        <MenuItem value={"ACTIVATED"}>Đã kích hoạt</MenuItem>
                        <MenuItem value={"NOT_ACTIVATED"}>
                            Đã huỷ kích hoạt
                        </MenuItem>
                        <MenuItem value={"CONFIRM_EMAIL"}>
                            Đang xác nhận mail
                        </MenuItem>
                    </TextField>
                    <TextField
                        select
                        onChange={handleChange}
                        variant="standard"
                        defaultValue={"#"}
                        sx={{ m: 0, minWidth: 120 }}
                        title="Lọc theo quyền"
                        name="role"
                        value={filterParams.role || "#"}
                    >
                        <MenuItem value="#">
                            <em>Quyền</em>
                        </MenuItem>
                        <MenuItem value={"ADMIN"}>Quản trị viên</MenuItem>
                        <MenuItem value={"USER"}>Người dùng</MenuItem>
                    </TextField>
                    <Button>
                        <FilterAltSharp style={toolStyle} />
                    </Button>
                </Stack>
            </form>
            {selectedRows.length > 0 &&
                selectedRows.every((row) => {
                    console.log(row);
                    return row.status === "ACTIVATED";
                }) && (
                    <Button
                        className="align-self-end"
                        endIcon={<Remove />}
                        color="error"
                        variant="contained"
                    >
                        Deactivate
                    </Button>
                )}
        </GridToolbarContainer>
    );
}

export default memo(CustomToolbar);
