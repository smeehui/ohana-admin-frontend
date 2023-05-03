import {memo, useCallback, useContext, useEffect, useState} from "react";
import {useTheme} from "@emotion/react";
import {Done, FilterAlt, RemoveDoneOutlined, Restore,} from "@mui/icons-material";
import {Button, MenuItem, TextField} from "@mui/material";
import {Stack} from "@mui/system";
import {GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector,} from "@mui/x-data-grid";
import useDebounce from "~/hooks/useDebounce";
import {useIsMount} from "~/hooks/useIsMount";
import {tokens} from "~/theme";
import {toast} from "react-toastify";
import ConfirmationDialog from "~/pages/PostManagement/ListPost/components/ConfirmationDialog";
import {PostStatus} from "~/pages/PostManagement/ListPost/constants/PostStatus";
import {postService} from "~/service";
import {PostContext, postManagementActions} from "~/pages/PostManagement/PostManagementContext/PostManagementContext";

const LockButton = ({onClick}) => (
    <Button
        color="error"
        variant="contained"
        onClick={() => onClick(PostStatus.REFUSED)}
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
        onClick={() => onClick(PostStatus.PUBLISHED)}
        title="Kích hoạt"
    >
        <Done/>
    </Button>
);

function CustomToolbar({selectedRows, forceReload,doFiler}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const toolStyle = {color: colors.greenAccent[300]};
    const [state,dispatch] = useContext(PostContext);

    const [action, setAction] = useState({
        type: "",
        isShow: false,
        data: selectedRows,
        isFilter: false
    });

    const debouncedFilter = useDebounce(state.filter, 500);

    const isMounted = useIsMount();

    const handleSubmit = (e) => {
        e.preventDefault();
        setAction({...action, isFilter: !action.isFilter});
    };

    const handleChange = (e) => {
       dispatch({type: postManagementActions.SET_FILTER,payload: {[e.target.name]: e.target.value}});
    };
    useEffect(()=>{
        if (isMounted) return;
        dispatch({type: postManagementActions.DO_FILTER,payload: doFiler})
    },[debouncedFilter])

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
        (async ()=>{
            const { data, type } = action;
            try {
                let ids = data.map(item => item.id);
                let result = await postService.updateAllPostStatusByIds(ids,type)
                const successfulPosts = data.filter(u => result.succeed.some(rs => rs === u.id));
                const failedPosts = data.filter(u => result.failed.some(rs => rs === u.id));
                successfulPosts.forEach(p=>toast.success( `${type===PostStatus.PUBLISHED ? "Đăng ": "Thu hồi "} bài viết ${p.title} thành công!`))
                failedPosts.forEach(p => toast.error(`${type === PostStatus.PUBLISHED ? "Đăng " : "Thu hồi "} bài viết ${p.title} thất bại!`));
            } catch (error) {
                console.log(error);
            } finally {
                handleCloseDialog();
                forceReload();
            }
        })()
    }, [action.type]);


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
                        value={state.filter.keyword}
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
                        value={state.filter.status || "#"}
                    >
                        <MenuItem value="#">
                            <em>Trạng thái</em>
                        </MenuItem>
                        <MenuItem value={PostStatus.PUBLISHED}>Đã đăng</MenuItem>
                        <MenuItem value={PostStatus.REFUSED}>
                            Đã thu hồi
                        </MenuItem>
                        <MenuItem value={PostStatus.PENDING_REVIEW}>
                            Đang chờ xác nhận
                        </MenuItem>
                        <MenuItem value={PostStatus.DRAFT}>
                            Đang lưu nháp
                        </MenuItem>
                        <MenuItem value={PostStatus.OVER_ROOM}>
                            Hết phòng
                        </MenuItem>
                        <MenuItem value={PostStatus.DELETED}>
                            Đã xoá
                        </MenuItem>
                    </TextField>
                    <Button
                        variant="outlined"
                        color="warning"
                        title="Xoá bộ lọc"
                    >
                        <Restore/>
                    </Button>
                    <Button variant="outlined" color="success" title="Lọc">
                        <FilterAlt style={toolStyle}
                                   onClick={() => doFilter()}
                        />
                    </Button>
                </Stack>
            </form>
            {selectedRows.length > 0 &&
                (selectedRows.every((row) => row.status === PostStatus.PUBLISHED)
                    ? (<LockButton onClick={handleAction}/>)
                    : selectedRows.every((row) => row.status === PostStatus.REFUSED)
                        ? (<UnlockButton onClick={handleAction}/>)
                        : selectedRows.every((row) => row.status === PostStatus.PENDING_REVIEW)
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
