import { useTheme } from "@emotion/react";
import {
    Add,
    FilterAlt,
    Lock,
    LockOpen,
    Remove, RemoveDoneOutlined,
    Restore,
} from "@mui/icons-material";
import { Button, IconButton, MenuItem, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { memo, useCallback, useEffect, useState } from "react";
import useDebounce from "~/hooks/useDebounce";
import { useIsMount } from "~/hooks/useIsMount";
import { tokens } from "~/theme";
import ConfirmationDialog from "./ConfirmationDialog";
import { updateStatusAll } from "../../../service/userService";
import { toast } from "react-toastify";

const LockButton = ({ onClick }) => (
    <Button
        color="error"
        variant="contained"
        onClick={() => onClick("deactivate")}
        title="Huỷ kích hoạt"
    >
        <RemoveDoneOutlined />
    </Button>
);

const UnlockButton = ({ onClick }) => (
    <Button
        className="align-self-end"
        color="success"
        variant="contained"
        onClick={() => onClick("activate")}
        title="Kích hoạt"
    >
        <Done />
    </Button>
);

function CustomToolbar({ selectedRows, handleFilter, forceReload }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const toolStyle = { color: colors.greenAccent[300] };
    const [filterParams, setFilterParams] = useState({
        keyword: "",
        status: undefined,
        role: undefined,
    });
    const [filter, setFilter] = useState(false);

    const [action, setAction] = useState({
        type: "",
        isShow: false,
        data: selectedRows,
    });

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

    const handleAction = useCallback(
        (type) => {
            setAction((prev) => ({ ...prev, type: type, isShow: true }));
        },
        [action.isShow],
    );

    const handleCloseDialog = useCallback((type) => {
        setAction((prev) => ({ ...prev, type: type, isShow: false }));
    }, []);
    const handleConfirmAction = useCallback(() => {
        const { data, type } = action;
        console.log(action);
        try {
            let result = updateStatusAll(
                action.data.map((item) => item.id),
                type,
            );
            console.log(result);
            data.forEach((element) => {
                toast.success(
                    `${
                        type === "deactivate" ? "Huỷ kích hoạt" : "Kích hoạt"
                    } tài khoản ${element.fullName} thành công`,
                );
            });
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseDialog();
            forceReload();
        }
    }, [action.type]);
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
                        <MenuItem value={"DEACTIVATED"}>
                            Đã huỷ kích hoạt
                        </MenuItem>
                        <MenuItem value={"CONFIRM_EMAIL"}>
                            Đang xác nhận mail
                        </MenuItem>
                    </TextField>
                    <Button
                        variant="outlined"
                        color="warning"
                        title="Xoá bộ lọc"
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
                    <Button variant="outlined" color="success" title="Lọc">
                        <FilterAlt style={toolStyle} />
                    </Button>
                </Stack>
            </form>
            {selectedRows.length > 0 &&
                (selectedRows.every((row) => row.status === "PUBLISHED") ? (
                    <LockButton onClick={handleAction} />
                ) : selectedRows.every(
                      (row) => row.status === "REFUSED",
                  ) ? (
                    <UnlockButton onClick={handleAction} />
                ) : selectedRows.every(
                      (row) => row.status === "PENDING_REVIEW",
                  ) ? (
                    <>
                        <LockButton onClick={handleAction} />
                        <UnlockButton onClick={handleAction} />
                    </>
                ) : null)}
            {/* {action.isShow && (
                <ConfirmationDialog
                    action={action}
                    onClose={handleCloseDialog}
                    onAgree={handleConfirmAction}
                />
            )} */}
        </GridToolbarContainer>
    );
}

export default memo(CustomToolbar);
