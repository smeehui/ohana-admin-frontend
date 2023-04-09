import {useTheme} from "@emotion/react";
import {Done, FilterAlt, RemoveDoneOutlined, Restore,} from "@mui/icons-material";
import {Button, MenuItem, TextField} from "@mui/material";
import {Stack} from "@mui/system";
import {GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector,} from "@mui/x-data-grid";
import {memo, useCallback, useEffect, useMemo, useState} from "react";
import useDebounce from "~/hooks/useDebounce";
import {useIsMount} from "~/hooks/useIsMount";
import {tokens} from "~/theme";
import {DRAFT, OVER_ROOM, PENDING_REVIEW, PUBLISHED, REFUSED} from "~/pages/PostManagement/ListPost/constants";
import {locationService} from "~/service";
import {toast} from "react-toastify";

const LockButton = ({onClick}) => (
    <Button
        color="error"
        variant="contained"
        onClick={() => onClick("deactivate")}
        title="Huỷ kích hoạt"
    >
        <RemoveDoneOutlined/>
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
    const toolStyle = {color: colors.greenAccent[300]};
    const [filterParams, setFilterParams] = useState({
        keyword: "",
        status: undefined,
        location: {
            provinceId: 46,
            districtId: 474,
        }
    });

    let initLocation = useMemo(() => ({
        provinces: [],
        districts: [],
        province_id: 46,
        district_id: 474
    }), []);
    const [location, setLocation] = useState(initLocation)

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

    useEffect(() => {
       fetchProvinces()
    }, []);

    const fetchProvinces = useCallback(() => {
        (async () => {
            try {
                let provinces = await locationService.getAllProvinces();
                let districts = await locationService.getAllDistrictsByProvinceId(location.province_id);
                setLocation({
                    ...location,
                    provinces: provinces,
                    districts: districts,
                    district_id: isMounted ? 474 : districts[0].district_id
                });
            } catch (err) {
                toast.error("Lấy dữ liệu tỉnh thành thất bại!");
            }
        })();
    }, [location.province_id])

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
        // const { data, type } = action;
        // console.log(action);
        // try {
        //     let result = updateStatusAll(
        //         action.data.map((item) => item.id),
        //         type,
        //     );
        //     console.log(result);
        //     data.forEach((element) => {
        //         toast.success(
        //             `${
        //                 type === "deactivate" ? "Huỷ kích hoạt" : "Kích hoạt"
        //             } tài khoản ${element.fullName} thành công`,
        //         );
        //     });
        // } catch (error) {
        //     console.log(error);
        // } finally {
        //     handleCloseDialog();
        //     forceReload();
        // }
    }, [action.type]);

    const handleChangeProvince = (e) => {
        setLocation(prevState => ({...prevState, province_id: e.target.value}))
        setFilterParams(prevState => ({...prevState, location: {...prevState.location, provinceId: e.target.value}}))
    }

    const handleChangeDistrict = (e) => {
        setLocation(prevState => ({...prevState, district_id: e.target.value}))
        setFilterParams(prevState => ({...prevState, location: {...prevState.location, districtId: e.target.value}}))
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
                        style={{maxHeight: "500px"}}
                        title="Lọc theo tỉnh/thành"
                        onChange={handleChangeProvince}
                        sx={{
                            "& .MuiPaper-root": {
                                maxHeight: 400
                            }
                        }}
                        name="provinceId"
                        value={location.province_id}
                    >
                        <MenuItem value={-1}>
                            <em>Tỉnh/Thành phố</em>
                        </MenuItem>
                        {
                            location.provinces.map(
                                province =>
                                    (<MenuItem
                                        key={province.province_id}
                                        value={province.province_id}
                                    >
                                        {province.province_name}
                                    </MenuItem>)
                            )
                        }
                    </TextField>
                    <TextField
                        select
                        variant="standard"
                        defaultValue={-1}
                        style={{maxHeight: "500px"}}
                        title="Lọc theo quận/huyện"
                        onChange={handleChangeDistrict}
                        sx={{
                            "& .MuiPaper-root": {
                                maxHeight: 400
                            }
                        }}
                        name="districtId"
                        value={location.district_id || 474}
                    >
                        <MenuItem value={-1}>
                            <em>Quận/Huyện</em>
                        </MenuItem>
                        {
                            location.districts.map(
                                district =>
                                    (<MenuItem
                                        key={district.district_id}
                                        value={district.district_id}
                                    >
                                        {district.district_name}
                                    </MenuItem>)
                            )
                        }
                    </TextField>
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
                (selectedRows.every((row) => row.status === PUBLISHED) ? (
                    <LockButton onClick={handleAction} />
                ) : selectedRows.every(
                      (row) => row.status === REFUSED,
                  ) ? (
                    <UnlockButton onClick={handleAction} />
                ) : selectedRows.every(
                      (row) => row.status === PENDING_REVIEW,
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
