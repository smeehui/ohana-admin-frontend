import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "~/theme";
import { mockTransactions } from "~/data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import {
  AutoAwesomeOutlined,
  Category,
  CategoryOutlined,
  PeopleAltOutlined,
  PostAddOutlined,
  PostAddRounded,
} from "@mui/icons-material";
import {
  categoryService,
  postService,
  userService,
  utilitiesService,
} from "~/service";
import { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import { UserStatus } from "./../../pages/UserManagement/constants/UserStatus";
import { ACTIVATE_USER_ALL } from "./../../service/api/index";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useDocumentTitle("Ohana - Tổng quan");

  const [state, setState] = useState({
    countCate: 0,
    countUser: 0,
    countUtility: 0,
    countPost: 0,

    countUserByStatusACTIVATED: 0,
    countUserByStatusDEACTIVATED: 0,
    countUserByStatusCONFIRM_EMAIL: 0,

    countPostByStatusPENDING_REVIEW: 0,
    countPostByStatusPUBLISHED: 0,
    countPostByStatusREFUSED: 0,
    countPostByStatusDRAFT: 0,
    countPostByStatusDELETED: 0,
    countPostByStatusOVER_ROOM: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        let cate = await categoryService.countAll();

        let user = await userService.countAll();

        let utility = await utilitiesService.countAll();

        let post = await postService.countAll();

        let userByStatusACTIVATED = await userService.countAllUserByStatus(
          "ACTIVATED"
        );
        let userByStatusDEACTIVATED = await userService.countAllUserByStatus(
          "DEACTIVATED"
        );
        let userByStatusCONFIRM_EMAIL = await userService.countAllUserByStatus(
          "CONFIRM_EMAIL"
        );

        let postByStatusPENDING_REVIEW = await postService.countAllPostByStatus(
          "PENDING_REVIEW"
        );
        let postByStatusPUBLISHED = await postService.countAllPostByStatus(
          "PUBLISHED"
        );
        let postByStatusREFUSED = await postService.countAllPostByStatus(
          "REFUSED"
        );
        let postByStatusDRAFT = await postService.countAllPostByStatus("DRAFT");
        let postByStatusDELETED = await postService.countAllPostByStatus(
          "DELETED"
        );
        let postByStatusOVER_ROOM = await postService.countAllPostByStatus(
          "OVER_ROOM"
        );

        setState({
          ...state,
          countCate: cate.data,
          countUser: user.data,
          countUtility: utility.data,
          countPost: post.data,

          countUserByStatusACTIVATED: userByStatusACTIVATED.data,
          countUserByStatusDEACTIVATED: userByStatusDEACTIVATED.data,
          countUserByStatusCONFIRM_EMAIL: userByStatusCONFIRM_EMAIL.data,

          countPostByStatusPENDING_REVIEW: postByStatusPENDING_REVIEW.data,
          countPostByStatusPUBLISHED: postByStatusPUBLISHED.data,
          countPostByStatusREFUSED: postByStatusREFUSED.data,
          countPostByStatusDRAFT: postByStatusDRAFT.data,
          countPostByStatusDELETED: postByStatusDELETED.data,
          countPostByStatusOVER_ROOM: postByStatusOVER_ROOM.data,
        });
      } catch (error) {
        toast.error("Lấy dữ liệu thất bại!");
      }
    })();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        mb="60px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title="TRANG CHỦ" subtitle="Welcome to your dashboard" />

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
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
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
            title={state.countUser}
            subtitle="Số lượng người dùng"
            progress="0.50"
            // increase="+21%"
            icon={
              <PeopleAltOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
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
            progress="0.30"
            // increase="+5%"
            icon={
              <AutoAwesomeOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
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
            title={state.countPost}
            subtitle="Tổng số bài viết"
            progress="0.80"
            // increase="+43%"
            icon={
              <PostAddRounded
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box> */}

        {/* ROW 3 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box> */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          p="30px"
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
                      state.countPostByStatusPENDING_REVIEW,
                      state.countPostByStatusPUBLISHED,
                      state.countPostByStatusREFUSED,
                      state.countPostByStatusDRAFT,
                      state.countPostByStatusDELETED,
                      state.countPostByStatusOVER_ROOM,
                    ],
                    hoverOffset: 6
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
                      state.countUserByStatusACTIVATED,
                      state.countUserByStatusDEACTIVATED,
                      state.countUserByStatusCONFIRM_EMAIL,
                    ],
                    backgroundColor: [
                      "#4BC0C0",
                      "#FF6384",
                      "#FFCE56",
                    ],
                    hoverOffset: 6
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
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  Tên bài viết
                </Typography>
                <Typography color={colors.grey[100]}>
                  Tên người dùng
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>
              <Typography
                  color={colors.greenAccent[500]}
                  variant="h6"
                  fontWeight="600"
                >
                  Ngày đăng
                </Typography>
                {transaction.date}
                </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
