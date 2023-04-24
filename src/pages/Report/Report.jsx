import {CChart} from "@coreui/react-chartjs";
import {AutoAwesomeOutlined, CategoryOutlined, PeopleAltOutlined, PostAddRounded} from "@mui/icons-material";
import {Box, CircularProgress, MenuItem, Stack, TextField, Typography, useTheme} from "@mui/material";
import React, {useEffect, useState} from "react";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import {reportService} from "~/service";
import {tokens} from "~/theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import {config} from "~/config";
import {useNavigate} from "react-router-dom";
import dateTimeFormatter from "~/utils/dateTimeFormatter";
import {currencyFormatter} from "~/utils";
import {toast} from "react-toastify";

const Report = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    useDocumentTitle("Ohana - BÁO CÁO, THỐNG KÊ");
    const navigate = useNavigate();
    const {formatter} = dateTimeFormatter();

    const toggleLoading = (isLoading) => {
        setState({...state, isLoading: isLoading})
    }

    const [state, setState] = useState({
        isLoading: true,
        countCate: 0,
        countUser: 0,
        countUtility: 0,
        countPost: 0,
        topTenPendingPosts: [],
        startDate: new Date(),
        endDate: new Date(),
        userAnalysis: {
            ALL: 0,
            ACTIVATED: 0,
            DEACTIVATED: 0,
            CONFIRM_EMAIL: 0
        },
        postAnalysis: {
            ALL: 0,
            PENDING_REVIEW: 0,
            PUBLISHED: 0,
            REFUSED: 0,
            DRAFT: 0,
            DELETED: 0,
            OVER_ROOM: 0,
        },
        postMonthlyCount: [],
        userMonthlyCount: [],
        chartType: "line"
    });

    useEffect(() => {
        (async () => {
            try {

                toggleLoading(true)

                let userAnalysis = await reportService.getUserAnalysis();

                let postAnalysis = await reportService.getPostAnalysis();

                let topTenPost = await reportService.getTopTenPendingPost();

                let unpMonthlyCount = await reportService.countPostAndUserByMonth({
                    startDate: state.startDate,
                    endDate: state.endDate
                })

                let categoryAnalysis = await reportService.countAllCategory(); 

                let utilityAnalysis = await reportService.countAllUtilty(); 

                setState({
                    ...state,
                    ...unpMonthlyCount,
                    userAnalysis: {...userAnalysis},
                    postAnalysis: {...postAnalysis},
                    topTenPendingPosts: topTenPost.content,
                    countCate: categoryAnalysis.data,
                    countUtility: utilityAnalysis.data,
                    isLoading: false,
                })

            } catch (error) {
                toast.error("Lấy dữ liệu thất bại!");
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {

                toggleLoading(true)

                let unpMonthlyCount = await reportService.countPostAndUserByMonth({
                    startDate: state.startDate,
                    endDate: state.endDate
                })

                setState({
                    ...state,
                    ...unpMonthlyCount,
                    isLoading: false
                })

            } catch (error) {
                toast.error("Lấy dữ liệu thất bại!");
            }
        })();
    }, [state.startDate, state.endDate]);


    function handleChangeDate(e) {
        setState({...state, [e.target.name]: e.target.value})
    }

    return <>
        {state.isLoading
            ? (<Box
                position={"absolute"}
                top={0}
                left={0}
                right={0}
                bottom={0}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <CircularProgress color="success" size={80}/>
            </Box>)
            : (<Box m="20px">
                {/* HEADER */}
                <Box
                    mb="60px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Header title="BÁO CÁO, THỐNG KÊ"/>

                    {/* <Box>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
      >
        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
        Download Reports
      </Button>
    </Box> */}
                </Box>

                {/* GRID & CHARTS */}
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="140px"
                    gap="20px"
                >
                    {/* ROW 1 */}
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={state.countCate}
                            subtitle="Danh mục phòng cho thuê"
                            // progress="0.75"
                            // increase="+14%"
                            icon={
                                <CategoryOutlined
                                    sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                                />
                            }
                        />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={state.userAnalysis.ALL - 1}
                            subtitle="Số lượng người dùng"
                            // progress="0.50"
                            // increase="+21%"
                            icon={
                                <PeopleAltOutlined
                                    sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                                />
                            }
                        />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={state.countUtility}
                            subtitle="Số tiện ích"
                            // progress="0.30"
                            // increase="+5%"
                            icon={
                                <AutoAwesomeOutlined
                                    sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                                />
                            }
                        />
                    </Box>

                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={state.postAnalysis.ALL}
                            subtitle="Tổng số bài viết"
                            // progress="0.80"
                            // increase="+43%"
                            icon={
                                <PostAddRounded
                                    sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                                />
                            }
                        />
                    </Box>

                    <Box
                        gridColumn="span 4"
                        gridRow="span 3"
                        backgroundColor={colors.primary[400]}
                        p="30px"
                        // overflow={"scroll"}
                    >
                        <Typography variant="h5" fontWeight="600">
                            Bài viết
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="left"
                            mt="25px"
                        >
                            <CChart
                                type="doughnut"
                                data={{
                                    labels: [
                                        "Đang chờ duyệt",
                                        "Đã đăng",
                                        "Đã thu hồi",
                                        "Nháp",
                                        "Đã xóa",
                                        "Đã hết phòng",
                                    ],
                                    datasets: [
                                        {
                                            backgroundColor: [
                                                "#41B883",
                                                "#EC2FEF",
                                                "#DD1B16",
                                                "#00D8FF",
                                                "#6E6767",
                                                "#ECEF2F",
                                            ],
                                            data: [
                                                state.postAnalysis.PENDING_REVIEW,
                                                state.postAnalysis.PUBLISHED,
                                                state.postAnalysis.REFUSED,
                                                state.postAnalysis.DRAFT,
                                                state.postAnalysis.DELETED,
                                                state.postAnalysis.OVER_ROOM,
                                            ],
                                            hoverOffset: 6,
                                        },
                                    ],
                                }}
                            />
                        </Box>
                    </Box>

                    <Box
                        gridColumn="span 4"
                        gridRow="span 3"
                        backgroundColor={colors.primary[400]}
                        p="30px"
                        // overflow={"scroll"}
                    >
                        <Typography variant="h5" fontWeight="600">
                            Người dùng
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="left"
                            mt="25px"
                        >
                            <CChart
                                type="polarArea"
                                data={{
                                    labels: [
                                        "Đang hoạt động",
                                        "Ngừng hoạt động",
                                        "Đang chờ xác thực",
                                    ],
                                    datasets: [
                                        {
                                            data: [
                                                state.userAnalysis.ACTIVATED - 1,
                                                state.userAnalysis.DEACTIVATED,
                                                state.userAnalysis.CONFIRM_EMAIL,
                                            ],
                                            backgroundColor: ["#4BC0C0", "#FF6384", "#FFCE56"],
                                            hoverOffset: 6,
                                        },
                                    ],
                                }}
                            />
                        </Box>
                    </Box>

                    <Box
                        gridColumn="span 4"
                        gridRow="span 3"
                        backgroundColor={colors.primary[400]}
                        overflow="auto"
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            colors={colors.grey[100]}
                            p="15px"
                        >
                            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                                Bài viết gần nhất chờ xét duyệt
                            </Typography>
                        </Box>
                        {state.topTenPendingPosts.map((post, i) => (
                            <Box
                                key={`${post.id}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`4px solid ${colors.primary[500]}`}
                                p="15px"
                            > <Box maxWidth={200} display={"flex"} flexDirection={"column"}>
                                    <Typography
                                        role={"button"}
                                        component={"a"}
                                        color={colors.greenAccent[500]}
                                        variant="h5"
                                        fontWeight="600"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(config.routes.postDetails + post.id);
                                        }}
                                    >
                                        {post.title}
                                    </Typography>
                                    <Typography component={"a"} onClick={(e) => {
                                        e.preventDefault();
                                        navigate(config.routes.userDetails + post.user.id);
                                    }} color={colors.grey[100]}>{post.user.fullName}</Typography>
                                </Box>
                                <Box color={colors.grey[100]}>
                                    <Typography
                                        color={colors.greenAccent[500]}
                                        variant="h6"
                                        fontWeight="600"
                                    >
                                        Ngày đăng
                                    </Typography>
                                    {formatter(post.createdAt)}
                                </Box>
                                <Box
                                    backgroundColor={colors.greenAccent[500]}
                                    p="5px 10px"
                                    borderRadius="4px"
                                >
                                    {currencyFormatter.formatVnd(post.rentHouse.roomPrice) + " đ"}
                                </Box>

                                
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box p={3} mt={3} width={"100%"} bgcolor={colors.primary[400]}>
                    <Box display={"flex"} justifyContent={"space-between"} height={50}>
                        <Typography variant="h5" fontWeight="600">
                            Biều đổ bài viết và người dùng
                        </Typography>
                        <Stack spacing={2} direction={"row"}>
                            <TextField
                                type="date"
                                name="startDate"
                                variant="standard"
                                autoFocus
                                helperText={<Typography>Chọn ngày bắt đầu</Typography>}
                                onChange={handleChangeDate}
                                value={state.startDate}
                                lang={'vi-Vn'}

                            />
                            <TextField
                                lang={'vi-Vn'}
                                type="date"
                                name="endDate"
                                variant="standard"
                                autoFocus
                                onChange={handleChangeDate}
                                helperText={<Typography>Chọn ngày kết thúc</Typography>}
                                value={state.endDate}
                                InputProps={{inputProps:{min: state.startDate, lang:"vi-VN"}}}
                            />
                            <TextField
                                select
                                name="chartType"
                                variant="standard"
                                autoFocus
                                onChange={(e) => setState({...state, chartType: e.target.value})}
                                helperText={<Typography>Chọn kiểu biểu đồ</Typography>}
                                value={state.chartType}
                            >
                                <MenuItem value={"line"}>
                                    Biểu đồ đường
                                </MenuItem>
                                <MenuItem value={"bar"}>
                                    Biểu đồ cột
                                </MenuItem>
                            </TextField>
                        </Stack>
                    </Box>

                    <Box>
                        {state.chartType === "line"
                            ? <CChart
                                redraw
                                type={"line"}
                                data={{
                                    labels: state.postMonthlyCount.map(p => p.date),
                                    datasets: [
                                        {
                                            label: "Số bài viết",
                                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                                            borderColor: "rgba(220, 220, 220, 1)",
                                            pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                            pointBorderColor: "#fff",
                                            data: state.postMonthlyCount.map(p => p.count),
                                        },
                                        {
                                            label: "Số người dùng",
                                            backgroundColor: colors.pink[400],
                                            borderColor: colors.pink[400],
                                            pointBackgroundColor: colors.pink[400],
                                            pointBorderColor: "#fff",
                                            data: state.userMonthlyCount.map(u => u.count),
                                        }
                                    ]
                                }
                                }/>
                            : <CChart
                                redraw
                                labels={"month"}
                                type={"bar"}
                                data={{
                                    labels: state.postMonthlyCount.map(p => p.date),
                                    datasets: [
                                        {
                                            label: "Số bài viết",
                                            backgroundColor: colors.grey[400],
                                            data: state.postMonthlyCount.map(p => p.count),
                                        },
                                        {
                                            label: "Số người dùng",
                                            backgroundColor: colors.pink[400],
                                            data: state.userMonthlyCount.map(u => u.count),
                                        }
                                    ],
                                }}
                            />

                        }

                    </Box>
                </Box>

            </Box>)
        }
    </>;
};

export default Report;
