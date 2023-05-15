import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {Link, useParams} from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {toast} from "react-toastify";
import defaultUserImg from "~/resources/assets/img/default-user.png"
import {cloudinaryService, postService} from "~/service";
import styles from "./PostDetails.module.scss";
import clsx from "clsx";
import PostImagesModal from "~/pages/PostManagement/PostDetails/PostImagesModal";
import { tokens } from "~/theme";
import {
  Block,
  CheckCircleOutlined,
  ErrorOutlined,
  Flaky,
  HouseRounded,
  LocalLaundryService,
  Person,
  RemoveCircle,
} from "@mui/icons-material";
import { currencyFormatter } from "~/utils";
import CldImage from "~/components/CldImage";
import dateTimeFormatter from "~/utils/dateTimeFormatter";
import "~/resources/assets/css/ohanaIcons.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { PostStatus } from "~/pages/PostManagement/ListPost/constants/PostStatus";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import { AppContext } from "~/store";
import { GlobalActions } from "~/store/actionConstants";
import noImage from "~/resources/assets/img/no-image.jpg";
import {config} from "~/config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide easing={"enter"} ref={ref} {...props} />;
});

function PostDetails() {
  const { id } = useParams();
  const theme = useTheme();
  const { formatter } = dateTimeFormatter();
  const colors = tokens(theme.palette.mode);
  const [globalState, globalDispatch] = useContext(AppContext);

  const { post } = globalState;

  const [state, setState] = useState({
    isLoadMore: false,
    imageClicked: false,
    isShowPhone: false,
    isShowConfirm: false,
    modifyingStatus: "",
    isLoading: true,
  });
  useDocumentTitle("Ohana - " + post.title);

  const boxStyles = useMemo(
    () => ({
      borderRadius: 5,
      display: "flex",
      flexDirection: "column",
      padding: 3,
      bgcolor: colors.primary[400],
    }),
    [theme.palette.mode]
  );

  const handleChangePostStatus = (e) => {
    setState({
      ...state,
      isShowConfirm: true,
      modifyingStatus: e.target.value,
    });
  };

  const onClose = () => {
    setState({ ...state, isShowConfirm: false });
  };

  function setPostProperties(post) {
    post.images = post.postMedia.map((img, index) => {
      let cols = index === 0 ? 4 : 2;
      let rows = index === 0 ? 4 : 2;
      let isHidden = index > 4;
      let size = 100;
      return srcset(img, size, rows, cols, isHidden, index);
    });

    globalDispatch({
      type: GlobalActions.SET_POST_INFO,
      payload: { post, pageType: "POST" },
    });
  }

  const onAgree = async () => {
    const params = { id: post.id, status: state.modifyingStatus,userId: globalState.post.user.id };
    try {
      globalDispatch({ type: GlobalActions.CLEAR_SEARCH });
      let post = await postService.updatePostStatusById(params);

      setPostProperties(post);

      setState((prevState) => {
        return {
          ...prevState,
          isLoadMore: post.images.length > 4,
          isLoading: false,
          isShowConfirm: false,
        };
      });
      toast.success("Cập nhật thành công!");
    } catch (err) {

      toast.error("Cập nhật bài viết thất bại");

      setState({ ...state, isShowConfirm: false });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let post = await postService.getPostById(id);

        setPostProperties(post);

        setState((prevState) => {
          return {
            ...prevState,
            isLoadMore: post.images.length > 4,
            isLoading: false,
          };
        });
      } catch (e) {
        console.log(e)
        toast.error("Lấy dữ liệu post thất bại");
      }
    })();
  }, [id]);

  const formatPriceProp = (money) => {
    switch (money) {
      case 0:
        return "Miễn phí";
      case undefined:
      case null:
        return "Không có thông tin";
      default:
        return currencyFormatter.formatVnd(money) + " Đồng";
    }
  };

  function srcset(image, size, rows = 1, cols = 1, isHidden, index) {
    return {
      url: cloudinaryService.generateImageById(image.publicId, {
        width: size * cols,
        height: size * rows,
        r: 10,
      }),
      rows: rows,
      cols: cols,
      isHidden: isHidden,
      index: index,
    };
  }

  const handleClick = useCallback(() => {
    setState({ ...state, imageClicked: !state.imageClicked });
  }, [state]);
  return (
      <>
        {state.isLoading ? (
            <Box
                position={"absolute"}
                top={0}
                bottom={0}
                left={0}
                right={0}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
              <CircularProgress color={"success"}/>
            </Box>
        ) : (
            <Container fluid>
              {state.imageClicked && (
                  <PostImagesModal
                      isOpen={state.imageClicked}
                      onClose={handleClick}
                  />
              )}
              <Box borderRadius={2}>
                <ImageList
                    style={{overflowY: "hidden"}}
                    variant="quilted"
                    cols={8}
                    rowHeight={121}
                >
                  {post.images.length > 0 &&
                      post.images.map((img) => (
                          <ImageListItem
                              onClick={(e) => handleClick(img)}
                              className={clsx("rounded rounded-3 overflow-hidden", {
                                [styles["load-more"]]:
                                img.index === 4 && post.images.length > 5,
                              })}
                              hidden={img.isHidden}
                              sx={{
                                cursor: "pointer",
                                transition: "250ms",
                                "&:hover": {
                                  boxShadow: "0 0 10px black",
                                  transform: "translateY(1px)",
                                },
                                [`&.${styles["load-more"]}::after`]: {
                                  content: `"+${post.images.length - 5}"`,
                                },
                              }}
                              key={img.url}
                              cols={img.cols || 1}
                              rows={img.rows || 1}
                          >
                            <img
                                alt={"Post image"}
                                src={img.url}
                                onError={({currentTarget}) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = noImage;
                                }}
                            />
                          </ImageListItem>
                      ))}
                </ImageList>
              </Box>
              <h2>{post.title}</h2>
              <Box display="flex" className={"flex-md-column flex-lg-row"}>
                <Col lg={7} md={12} className="pe-2">
                  <Stack direction={"column"} spacing={2}>
                    <Box {...boxStyles}>
                      <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          borderRadius={50}
                          bgcolor={colors.grey[900]}
                          width={"fit-content"}
                          padding={0.5}
                      >
                        <IconButton sx={{backgroundColor: "#eee"}}>
                          <HouseRounded
                              fontSize={"large"}
                              sx={{color: colors.pink[400]}}
                          />
                        </IconButton>
                        <Typography paddingX={5} fontWeight={"bold"} fontSize={30}>
                          Thông tin phòng
                        </Typography>
                      </Box>
                      <Box
                          marginTop={2}
                          sx={{
                            "& .MuiTypography-root ": {
                              fontWeight: "bold",
                            },
                          }}
                      >
                        <Row>
                          <Col lg={3}>
                            <Typography textTransform={"uppercase"}>
                              GIÁ PHÒNG
                            </Typography>
                            <Typography>
                              {formatPriceProp(post.rentHouse.price)}
                            </Typography>
                          </Col>
                          <Col lg={3}>
                            <Typography textTransform={"uppercase"}>
                              DIỆN TÍCH
                            </Typography>
                            <Typography>{post.rentHouse.area} mét vuông</Typography>
                          </Col>
                          <Col lg={3}>
                            <Typography textTransform={"uppercase"}>
                              ĐẶT CỌC
                            </Typography>
                            <Typography>
                              {formatPriceProp(post.rentHouse.deposit)}
                            </Typography>
                          </Col>
                          <Col lg={3}>
                            <Typography textTransform={"uppercase"}>
                              SỨC CHỨA
                            </Typography>
                            <Typography>{post.rentHouse.capacity}</Typography>
                          </Col>
                        </Row>
                        <Row className={"my-3"}>
                          <Col lg={3}>
                            <Typography textTransform={"uppercase"}>
                              ĐIỆN
                            </Typography>
                            <Typography>
                              {formatPriceProp(post.rentHouse.electricityPrice)}
                            </Typography>
                          </Col>
                          <Col lg={3}>
                            <Typography textTransform={"uppercase"}>
                              NƯỚC
                            </Typography>
                            <Typography>
                              {formatPriceProp(post.rentHouse.waterPrice)}
                            </Typography>
                          </Col>
                          <Col lg={3}>
                            <Typography textTransform={"uppercase"}>
                              WIFI
                            </Typography>
                            <Typography>
                              {formatPriceProp(post.rentHouse.wifiPrice)}
                            </Typography>
                          </Col>
                          <Col lg={3}>
                            <Typography textTransform={"uppercase"}>
                              TRẠNG THÁI
                            </Typography>
                            <Typography
                                textTransform={"uppercase"}
                                color={post.rentHouse.status ? "success" : "error"}
                            >
                              {post.rentHouse.status ? "Còn trống" : "Đã cho thuê"}
                            </Typography>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Typography textTransform={"uppercase"}>
                              ĐỊA CHỈ
                            </Typography>
                            <Typography>
                              {post.location &&
                                  `${post.location.line1}, ${post.location.wardName}, ${post.location.districtName}, ${post.location.provinceName}`}
                            </Typography>
                          </Col>
                        </Row>
                      </Box>
                    </Box>
                    <Box {...boxStyles}>
                      <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          borderRadius={50}
                          bgcolor={colors.grey[900]}
                          width={"fit-content"}
                          padding={0.5}
                      >
                        <IconButton sx={{backgroundColor: "#eee"}}>
                          <LocalLaundryService
                              fontSize={"large"}
                              sx={{color: colors.greenAccent[500]}}
                          />
                        </IconButton>
                        <Typography paddingX={5} fontWeight={"bold"} fontSize={30}>
                          Tiện ích
                        </Typography>
                      </Box>
                      <Box
                          marginTop={2}
                          sx={{
                            "& .MuiTypography-root ": {
                              fontWeight: "bold",
                            },
                          }}
                      >
                        <Grid container direction={"row"} spacing={1}>
                          {post.utilities &&
                              post.utilities.map((util) => (
                                  <Grid
                                      key={util.id}
                                      style={{fontSize: "2rem"}}
                                      item
                                      xs={3}
                                      display={"flex"}
                                      title={util.title}
                                  >
                                    <i className={clsx(util.icon)}></i>
                                    <Typography
                                        fontSize={16}
                                        marginX={1}
                                        alignContent={"center"}
                                        lineHeight={2.5}
                                    >
                                      {util.name}
                                    </Typography>
                                  </Grid>
                              ))}
                        </Grid>
                      </Box>
                    </Box>
                    <Box {...boxStyles}>
                      <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          borderRadius={50}
                          bgcolor={colors.grey[900]}
                          width={"fit-content"}
                          padding={0.5}
                      >
                        <IconButton sx={{backgroundColor: "#eee"}}>
                          <ErrorOutlined
                              fontSize={"large"}
                              sx={{color: colors.blueAccent[500]}}
                          />
                        </IconButton>
                        <Typography paddingX={5} fontWeight={"bold"} fontSize={30}>
                          Mô tả thêm
                        </Typography>
                      </Box>
                      <Box
                          marginTop={2}
                          sx={{
                            "& .MuiTypography-root ": {
                              fontWeight: "bold",
                            },
                          }}
                      >
                        <Grid container direction={"row"} spacing={1}>
                          <Typography fontSize={16}>
                            {post.descriptionContent}
                          </Typography>
                        </Grid>
                      </Box>
                    </Box>
                  </Stack>
                </Col>
                <Col
                    className="position-sticky ps-2"
                    style={{top: 0}}
                    lg={5}
                    md={12}
                >
                  <Stack direction={"column"} spacing={2}>
                    <Box {...boxStyles}>
                      <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          borderRadius={50}
                          bgcolor={colors.grey[900]}
                          width={"fit-content"}
                          padding={0.5}
                          flex={1}
                      >
                        <IconButton sx={{backgroundColor: "#eee"}}>
                          <Person
                              fontSize={"large"}
                              sx={{color: colors.blueAccent[500]}}
                          />
                        </IconButton>
                        <Typography
                            paddingX={2}
                            fontWeight={"bold"}
                            fontSize={30}
                            whiteSpace={"nowrap"}
                        >
                          Thông tin chủ phòng
                        </Typography>
                      </Box>
                      <Stack
                          sx={{
                            marginTop: 2,
                            "& .MuiTypography-root": {fontWeight: "bold"},
                          }}
                      >
                        <Grid container direction={"row"}>
                          <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                borderRight: "1px solid" + colors.grey[500],
                              }}
                          >
                            <div
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  borderRadius: "50%",
                                  backgroundColor: colors.grey[900],
                                  margin: "0 5px",
                                  float: "right",
                                }}
                            >
                              {post.user.thumbnailId ? (
                                  <CldImage
                                      id={post.user.thumbnailId}
                                      w={60}
                                      h={60}
                                      r={50}
                                      alt={"user image"}
                                  />
                              ) : (
                                  <img
                                      src={defaultUserImg}
                                      width={60}
                                      height={60}
                                      style={{borderRadius: "50%"}}
                                  />
                              )}
                            </div>
                            <div className="d-flex flex-column justify-content-between ps-3">
                              <Link to={config.routes.userDetails + post.user.id}>
                                <Typography
                                    lineHeight={2}
                                    fontSize={16}
                                    className={"w-100"}
                                >
                                  {post.user.fullName}
                                </Typography>
                              </Link>
                              <Typography
                                  sx={{cursor: "pointer"}}
                                  lineHeight={2}
                                  fontSize={16}
                                  className={"w-100"}
                                  onClick={() =>
                                      setState({
                                        ...state,
                                        isShowPhone: !state.isShowPhone,
                                      })
                                  }
                              >
                                SĐT:{" "}
                                {state.isShowPhone && post.user.phone
                                    ? post.user.phone
                                    : post.user.phone.substring(0, 7) + "xxx"}
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <div className="d-flex flex-column justify-content-between ps-3">
                              <Typography
                                  lineHeight={2}
                                  fontSize={16}
                                  className={"w-100"}
                              >
                                Ngày đăng:
                              </Typography>
                              <Typography
                                  lineHeight={2}
                                  fontSize={16}
                                  className={"w-100"}
                              >
                                {formatter(post.createdAt ? post.createdAt : null)}
                              </Typography>
                            </div>
                          </Grid>
                        </Grid>
                      </Stack>
                    </Box>
                    <Box {...boxStyles}>
                      <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          borderRadius={50}
                          bgcolor={colors.grey[900]}
                          width={"fit-content"}
                          padding={0.5}
                          flex={1}
                      >
                        <IconButton sx={{backgroundColor: "#eee"}}>
                          <Flaky
                              fontSize={"large"}
                              sx={{color: colors.redAccent[300]}}
                          />
                        </IconButton>
                        <Typography
                            paddingX={2}
                            fontWeight={"bold"}
                            fontSize={30}
                            whiteSpace={"nowrap"}
                        >
                          Kiểm duyệt
                        </Typography>
                      </Box>
                      <Stack
                          sx={{
                            marginTop: 2,
                            "& .MuiTypography-root": {fontWeight: "bold"},
                          }}
                      >
                        <Grid container direction={"row"}>
                          <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                borderRight: "1px solid" + colors.grey[500],
                                justifyContent: "center",
                              }}
                          >
                            {post.status && post.status === PostStatus.REFUSED && (
                                <Typography
                                    fontSize={18}
                                    sx={{alignSelf: "center"}}
                                >
                                  Bài viết đã thu hồi
                                </Typography>
                            )}
                            {post.status &&
                                post.status === PostStatus.PUBLISHED && (
                                    <Typography
                                        fontSize={18}
                                        sx={{alignSelf: "center"}}
                                    >
                                      Bài viết đã đăng
                                    </Typography>
                                )}
                            {post.status &&
                                post.status === PostStatus.PENDING_REVIEW && (
                                    <Typography
                                        fontSize={18}
                                        sx={{alignSelf: "center"}}
                                    >
                                      Bài viết đang chờ xác nhận
                                    </Typography>
                                )}
                          </Grid>
                          <Grid item xs={6}>
                            <Box display={"flex"} justifyContent={"center"}>
                              {post.status &&
                                  post.status === PostStatus.PUBLISHED && (
                                      <Button
                                          onClick={handleChangePostStatus}
                                          variant={"contained"}
                                          size={"large"}
                                          color={"error"}
                                          value={PostStatus.REFUSED}
                                      >
                                        Khoá bài viết <RemoveCircle/>
                                      </Button>
                                  )}
                              {post.status &&
                                  post.status === PostStatus.PENDING_REVIEW && (
                                      <Stack spacing={2} direction={"column"}>
                                        <Button
                                            onClick={handleChangePostStatus}
                                            variant={"contained"}
                                            size={"large"}
                                            color={"success"}
                                            value={PostStatus.PUBLISHED}
                                        >
                                          Đăng bài{" "}
                                          <CheckCircleOutlined sx={{marginLeft: 1}}/>
                                        </Button>
                                        <Button
                                            onClick={handleChangePostStatus}
                                            variant={"contained"}
                                            size={"large"}
                                            color={"error"}
                                            value={PostStatus.REFUSED}
                                        >
                                          Thu hồi bài viết{" "}
                                          <Block sx={{marginLeft: 1}}/>
                                        </Button>
                                      </Stack>
                                  )}
                              {post.status &&
                                  post.status === PostStatus.REFUSED && (
                                      <Button
                                          onClick={handleChangePostStatus}
                                          variant={"contained"}
                                          size={"large"}
                                          color={"success"}
                                          value={PostStatus.PUBLISHED}
                                      >
                                        Đăng bài{" "}
                                        <CheckCircleOutlined sx={{marginLeft: 1}}/>
                                      </Button>
                                  )}
                            </Box>
                          </Grid>
                          {post.status && post.status === PostStatus.DELETED && (
                              <Grid item xs={12}>
                                <Typography
                                    flex={1}
                                    variant={"secondary"}
                                    sx={{opacity: ".5"}}
                                    fontSize={18}
                                >
                                  Bài viết đã bị xoá bởi người dùng!
                                </Typography>
                              </Grid>
                          )}
                        </Grid>
                      </Stack>
                    </Box>
                  </Stack>
                </Col>
              </Box>
              <Dialog
                  open={state.isShowConfirm}
                  TransitionComponent={Transition}
                  keepMounted
                  // onClose={onClose}
                  aria-describedby="alert-dialog-slide-description"
              >
                <DialogContent>
                  <h4>
                    {`Bạn có chắc chắn muốn ${
                        state.modifyingStatus === PostStatus.PUBLISHED
                            ? "đăng"
                            : "thu hồi"
                    } bài đăng này:`}
                  </h4>

                  <Stack spacing={1}>

                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button
                      variant="contained"
                      color="warning"
                      onClick={() => onClose()}
                  >
                    Huỷ
                  </Button>
                  <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onAgree()}
                  >
                    Xác nhận
                  </Button>
                </DialogActions>
              </Dialog>
            </Container>
        )}
      </>
  );
}

export default PostDetails;
