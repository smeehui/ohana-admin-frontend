import {useTheme} from "@emotion/react";
import {FilterAlt, Lock, LockOpen, Restore,} from "@mui/icons-material";
import {Button, MenuItem, TextField} from "@mui/material";
import {Stack} from "@mui/system";
import {GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector,} from "@mui/x-data-grid";
import {memo, useCallback, useEffect, useState} from "react";
import useDebounce from "~/hooks/useDebounce";
import {useIsMount} from "~/hooks/useIsMount";
import {tokens} from "~/theme";
import ConfirmationDialog from "./ConfirmationDialog";
import {toast} from "react-toastify";
import {userService} from "~/service";
import {UserStatus} from "~/pages/UserManagement/constants/UserStatus";

const LockButton = ({ onClick }) => (
    <Button
        color="error"
        variant="contained"
        onClick={() => onClick(UserStatus.DEACTIVATED)}
        title="Huỷ kích hoạt"
    >
        <Lock />
    </Button>
);

const UnlockButton = ({ onClick }) => (
    <Button
        className="align-self-end"
        color="success"
        variant="contained"
        onClick={() => onClick(UserStatus.ACTIVATED)}
        title="Kích hoạt"
    >
        <LockOpen />
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
    
    const handleConfirmAction = useCallback(async () => {
        const { data, type } = action;
        try {
            let result = await userService.updateStatusAll(
                action.data.map((item) => item.id),
                type,
            );
            const successfulUsers = data.filter(u => result.succeed.some(rs => rs === u.id));
            
            const failedUsers = data.filter(u => result.failed.some(rs => rs === u.id));

            successfulUsers.forEach(u=>toast.success( `${type===UserStatus.DEACTIVATED ? "Huỷ kích hoạt ": "Kích hoạt "} tài khoản ${u.fullName} thành công!`))

            failedUsers.forEach(u=>toast.error( `${type===UserStatus.DEACTIVATED ? "Huỷ kích hoạt ": "Kích hoạt "} tài khoản ${u.fullName} thất bại!`))
        
        } catch (error) {
            
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

                    {/*<TextField*/}
                    {/*    select*/}
                    {/*    onChange={handleChange}*/}
                    {/*    variant="standard"*/}
                    {/*    defaultValue={"#"}*/}
                    {/*    sx={{ m: 0, minWidth: 120 }}*/}
                    {/*    title="Lọc theo quyền"*/}
                    {/*    name="role"*/}
                    {/*    value={filterParams.role || "#"}*/}
                    {/*>*/}
                    {/*    <MenuItem value="#">*/}
                    {/*        <em>Quyền</em>*/}
                    {/*    </MenuItem>*/}
                    {/*    <MenuItem value={"ADMIN"}>Quản trị viên</MenuItem>*/}
                    {/*    <MenuItem value={"USER"}>Người dùng</MenuItem>*/}
                    {/*</TextField>*/}
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
            {/* {selectedRows.length > 0 &&
                (selectedRows.every((row) => row.status === "ACTIVATED") ? (
                    <LockButton onClick={handleAction} />
                ) : selectedRows.every(
                      (row) => row.status === "DEACTIVATED",
                  ) ? (
                    <UnlockButton onClick={handleAction} />
                ) : selectedRows.every(
                      (row) => row.status === "CONFIRM_EMAIL",
                  ) ? (
                    <>
                        <LockButton onClick={handleAction} />
                        <UnlockButton onClick={handleAction} />
                    </>
                ) : null)} */}
            {action.isShow && (
                <ConfirmationDialog
                    action={action}
                    onClose={handleCloseDialog}
                    onAgree={handleConfirmAction}
                />
            )}
        </GridToolbarContainer>
    );
}

export default memo(CustomToolbar);
