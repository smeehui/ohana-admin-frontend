import {memo, useCallback, useContext, useEffect, useState} from "react";
import {useTheme} from "@emotion/react";
import {Done, FilterAlt, RemoveDoneOutlined, Restore,} from "@mui/icons-material";
import {Button, MenuItem, TextField} from "@mui/material";
import {Stack} from "@mui/system";
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from "@mui/x-data-grid";
import useDebounce from "~/hooks/useDebounce";
import {useIsMount} from "~/hooks/useIsMount";
import {tokens} from "~/theme";
import {DRAFT, OVER_ROOM, PENDING_REVIEW, PUBLISHED, REFUSED} from "~/pages/PostManagement/ListPost/constants";
import {LocationContext} from "~/store/contexts";
import {CHANGE_DISTRICT} from "~/store/actionConstants";
import {toast} from "react-toastify";
import ConfirmationDialog from "~/pages/PostManagement/ListPost/components/ConfirmationDialog";

const LockButton = ({onClick}) => (
    <Button
        color="error"
        variant="contained"
        onClick={() => onClick(REFUSED)}
        title="Huỷ kích hoạt"
    >
        <RemoveDoneOutlined/>
    </Button>
);

const UnlockButton = ({onClick}) => (
    <Button
        className="align-self-end"
        color="success"
        variant="contained"
        onClick={() => onClick(PUBLISHED)}
        title="Kích hoạt"
    >
        <Done/>
    </Button>
);

function CustomToolbar({selectedRows, handleFilter, forceReload}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [locationState, locationDispatch] = useContext(LocationContext);
    const toolStyle = {color: colors.greenAccent[300]};
    const [filterParams, setFilterParams] = useState({
        keyword: "",
        status: undefined,
        location: {
            provinceId: 46,
            districtId: 474,
        }
    });

    const [action, setAction] = useState({
        type: "",
        isShow: false,
        data: selectedRows,
        isFilter: false
    });
    const isMounted = useIsMount();

    const debouncedFilter = useDebounce(filterParams, 500);

    const handleSubmit = (e) => {
        e.preventDefault();
        setAction({...action, isFilter: !action.isFilter});
    };
    const handleChange = (e) => {
        if (e.target.value === "#")
            return (prev) => ({
                ...prev,
                [e.target.name]: "",
            });
        setFilterParams((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        });
    };
    useEffect(() => {
        if (!isMounted) handleFilter(filterParams);
    }, [debouncedFilter, action.isFilter]);
    const handleAction = useCallback(
        (type) => {
            setAction((prev) => ({...prev, type: type, isShow: true}));
        },
        [action.isShow],
    );

    const handleCloseDialog = useCallback((type) => {
        setAction((prev) => ({...prev, type: type, isShow: false}));
    }, []);
    const handleConfirmAction = useCallback(() => {
        const { data, type } = action;
        console.log(action);
        try {
            data.forEach((element) => {
                toast.success(
                    `${
                        type === REFUSED ? "Thu hồi" : "Đăng"
                    } bài viết ${element.fullName} thành công`,
                );
            });
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseDialog();
            forceReload();
        }
    }, [action.type]);

    const handleChangeProvince = (e) => {
        // setLocation(prevState => ({...prevState, province_id: e.target.value}))
        setFilterParams(prevState => ({...prevState, location: {...prevState.location, provinceId: e.target.value}}))
    }

    const handleChangeDistrict = (e) => {
        locationDispatch({
            type: CHANGE_DISTRICT,
            payload: e.target.value
        }, locationState)
    }

    return (
        <GridToolbarContainer className="d-flex justify-content-between my-1">
            <div>
                <GridToolbarColumnsButton style={toolStyle}/>
                <GridToolbarDensitySelector style={toolStyle}/>
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
                        variant="standard"
                        defaultValue={"#"}
                        sx={{minWidth: 120}}
                        title="Lọc theo trạng thái"
                        onChange={handleChange}
                        name="status"
                        value={filterParams.status || "#"}
                    >
                        <MenuItem value="#">
                            <em>Trạng thái</em>
                        </MenuItem>
                        <MenuItem value={PUBLISHED}>Đã đăng</MenuItem>
                        <MenuItem value={REFUSED}>
                            Đã chặn
                        </MenuItem>
                        <MenuItem value={PENDING_REVIEW}>
                            Đang chờ xác nhận
                        </MenuItem>
                        <MenuItem value={DRAFT}>
                            Đang lưu nháp
                        </MenuItem>
                        <MenuItem value={OVER_ROOM}>
                            Hết phòng
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
                        <Restore/>
                    </Button>
                    <Button variant="outlined" color="success" title="Lọc">
                        <FilterAlt style={toolStyle}
                                   onClick={() => setAction(prev => ({...prev, isFilter: !prev.isFilter}))}/>
                    </Button>
                </Stack>
            </form>
            {selectedRows.length > 0 &&
                (selectedRows.every((row) => row.status === PUBLISHED)
                    ? (<LockButton onClick={handleAction}/>)
                    : selectedRows.every((row) => row.status === REFUSED)
                        ? (<UnlockButton onClick={handleAction}/>)
                        : selectedRows.every((row) => row.status === PENDING_REVIEW)
                            ? (<>
                                    <LockButton onClick={handleAction}/>
                                    <UnlockButton onClick={handleAction}/>
                                </>)
                            : null)}
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
