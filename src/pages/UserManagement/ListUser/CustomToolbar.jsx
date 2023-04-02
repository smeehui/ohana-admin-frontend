import { useTheme } from "@emotion/react";
import {
    FilterAlt,
    FilterAltOff,
    FilterAltSharp,
    Remove,
    Restore,
    Search,
} from "@mui/icons-material";
import { Button, InputLabel, MenuItem, TextField } from "@mui/material";
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
    const [filter, setFilter] = useState(false);

    const isMounted = useIsMount();

    const debouncedFilter = useDebounce(filterParams, 500);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilter((filter) => !filter);
    };
    const handleChange = (e) => {
        if (e.target.value === "#")
            return (prev) => ({
                ...prev,
                [e.target.name]: "",
            });
        setFilterParams((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    useEffect(() => {
        if (!isMounted) handleFilter(filterParams);
    }, [debouncedFilter, filter]);
    return (
        <GridToolbarContainer className="d-flex justify-content-between my-1">
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
                        id="kw"
                        name="keyword"
                        variant="standard"
                        onChange={handleChange}
                        value={filterParams.keyword}
                        placeholder="Tìm kiếm..."
                    />

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
                    <Button
                        variant="outlined"
                        color="warning"
                        title="Reset filter"
                        onClick={() =>
                            setFilterParams({
                                keyword: "",
                                status: undefined,
                                role: undefined,
                            })
                        }
                    >
                        <Restore />
                    </Button>
                    <Button variant="outlined" color="success" title="Filter">
                        <FilterAlt style={toolStyle} />
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
                        onClick={() => handleFilter(filterParams)}
                    >
                        Deactivate
                    </Button>
                )}
        </GridToolbarContainer>
    );
}

export default memo(CustomToolbar);
