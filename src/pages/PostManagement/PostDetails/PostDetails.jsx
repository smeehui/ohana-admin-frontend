import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import {toast} from "react-toastify";

import {cloudinayService, postService} from "~/service";
import styles from "./PostDetails.module.scss";
import clsx from "clsx";
import PostImagesModal from "~/pages/PostManagement/PostDetails/PostImagesModal";
import {tokens} from "~/theme";
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
import {currencyFormatter} from "~/utils";
import CldImage from "~/components/CldImage";
import dateTimeFormatter from "~/utils/dateTimeFormatter";
import "~/assets/css/ohanaIcons.css";
import {PENDING_REVIEW, PUBLISHED, REFUSED} from "~/pages/PostManagement/ListPost/constants";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PostDetails() {
    const {id} = useParams();
    const theme = useTheme();
    const {formatter} = dateTimeFormatter();
    const colors = tokens(theme.palette.mode);
    const [state, setState] = useState({
        post: {},
        postImages: [],
        rentHouse: {},
        isLoadMore: false,
        imageClicked: false,
        user: {
            phone: "",
        },
        isShowPhone: false,
        isShowConfirm: false,
        modifyingStatus: "",
        isLoading: true,
    });

    const boxStyles = useMemo(
        () => ({
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            padding: 3,
            bgcolor: colors.primary[400],
        }),
        [theme.palette.mode],
    );

    const handleChangePostStatus = (e) => {
        console.log(e.target.value)
        setState({...state, isShowConfirm: true, modifyingStatus: e.target.value})
    }

    const onClose = () => {
        setState({...state, isShowConfirm: false})
    }
    const onAgree = async () => {
        const params = {id: state.post.id, status: state.modifyingStatus}
        try {
            let result = await postService.updatePostStatusById(params);
            setState((prevState) => ({
                ...prevState,
                post: {...prevState.post, status: result.status},
                isShowConfirm: false
            }))
            toast.success("Cập nhật thành công!")
        } catch (err) {
            toast.error("Cập nhật bài viết thất bại")
            setState({...state, isShowConfirm: false})

        }
    }

    useEffect(() => {
        (async () => {
            try {
                let post = await postService.getPostById(id);
                setState((prevState) => {
                    const images = post.postMedia.map((img, index) => {
                        let cols = index === 0 ? 4 : 2;
                        let rows = index === 0 ? 4 : 2;
                        let isHidden = index > 4;
                        let size = 100;
                        return srcset(img, size, rows, cols, isHidden, index);
                    });
                    return {
                        ...prevState,
                        post: post,
                        rentHouse: post.rentHouse,
                        postImages: images,
                        isLoadMore: images.length > 4,
                        user: post.user,
                        isLoading: false,
                    };
                });
            } catch (e) {
                toast.error("Lấy dữ liệu post thất bại");
            }
        })();
    }, []);

    function srcset(image, size, rows = 1, cols = 1, isHidden, index) {
        return {
            url: cloudinayService.generateImageById(image.id, {
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

    const handleClick = useCallback(
        () => {
            setState({...state, imageClicked: !state.imageClicked});
        },
        [state],
    );
    return (
        <>
            {state.isLoading ? <Box position={"absolute"}
                                    top={0} bottom={0} left={0} right={0}
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}>
                <CircularProgress
                color={"success"}/>
            </Box> : (<Container fluid>
                {state.imageClicked && (
                    <PostImagesModal
                        isOpen={state.imageClicked}
                        onClose={handleClick}
                    />
                )}
                <Box borderRadius={2}>
                    <ImageList variant="quilted" cols={8} rowHeight={121}>
                        {state.postImages.map((img) => (
                            <ImageListItem
                                onClick={(e) => handleClick(img)}
                                className={clsx(
                                    "rounded rounded-3 overflow-hidden",
                                    {
                                        [styles["load-more"]]:
                                        img.index === 4 &&
                                        state.postImages.length > 5,
                                    },
                                )}
                                hidden={img.isHidden}
                                sx={{
                                    cursor: "pointer",
                                    transition: "250ms",
                                    '&:hover': {
                                        boxShadow: "0 0 10px black",
                                        transform: "translateY(1px)"
                                    }
                                    ,
                                    [`&.${styles["load-more"]}::after`]: {
                                        content: `"+${
                                            state.postImages.length - 5
                                        }"`,
                                    },
                                }}
                                key={img.url}
                                cols={img.cols || 1}
                                rows={img.rows || 1}
                            >
                                <img alt={"Post image"} src={img.url}/>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
                <h2>{state.post.title}</h2>
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
                                    <Typography
                                        paddingX={5}
                                        fontWeight={"bold"}
                                        fontSize={30}
                                    >
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
                                                {currencyFormatter.formatVnd(
                                                    state.rentHouse.price,
                                                )} Đồng
                                            </Typography>
                                        </Col>
                                        <Col lg={3}>
                                            <Typography textTransform={"uppercase"}>
                                                DIỆN TÍCH
                                            </Typography>
                                            <Typography>
                                                {state.rentHouse.area} mét vuông
                                            </Typography>
                                        </Col>
                                        <Col lg={3}>
                                            <Typography textTransform={"uppercase"}>
                                                ĐẶT CỌC
                                            </Typography>
                                            <Typography>
                                                1,0000,000 Đồng
                                            </Typography>
                                        </Col>
                                        <Col lg={3}>
                                            <Typography textTransform={"uppercase"}>
                                                SỨC CHỨA
                                            </Typography>
                                            <Typography>
                                                {state.rentHouse.capacity}
                                            </Typography>
                                        </Col>
                                    </Row>
                                    <Row className={"my-3"}>
                                        <Col lg={3}>
                                            <Typography textTransform={"uppercase"}>
                                                ĐIỆN
                                            </Typography>
                                            <Typography>
                                                1,0000,000 Đồng
                                            </Typography>
                                        </Col>
                                        <Col lg={3}>
                                            <Typography textTransform={"uppercase"}>
                                                NƯỚC
                                            </Typography>
                                            <Typography>
                                                1,0000,000 Đồng
                                            </Typography>
                                        </Col>
                                        <Col lg={3}>
                                            <Typography textTransform={"uppercase"}>
                                                WIFI
                                            </Typography>
                                            <Typography>
                                                1,0000,000 Đồng
                                            </Typography>
                                        </Col>
                                        <Col lg={3}>
                                            <Typography textTransform={"uppercase"}>
                                                TRẠNG THÁI
                                            </Typography>
                                            <Typography
                                                textTransform={"uppercase"}
                                                color={
                                                    state.rentHouse.status
                                                        ? "success"
                                                        : "error"
                                                }
                                            >
                                                {state.rentHouse.status
                                                    ? "Còn trống"
                                                    : "Đã cho thuê"}
                                            </Typography>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Typography textTransform={"uppercase"}>
                                                ĐỊA CHỈ
                                            </Typography>
                                            <Typography>
                                                {state.post.location &&
                                                    `${state.post.location.line1}, ${state.post.location.wardName}, ${state.post.location.districtName}, ${state.post.location.provinceName}`}
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
                                    <Typography
                                        paddingX={5}
                                        fontWeight={"bold"}
                                        fontSize={30}
                                    >
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
                                        {state.post.utilities &&
                                            state.post.utilities.map((util) => (
                                                <Grid
                                                    key={util.id}
                                                    style={{fontSize: "2rem"}}
                                                    item
                                                    xs={3}
                                                    display={"flex"}
                                                    title={util.title}
                                                >
                                                    <i
                                                        className={clsx(util.icon)}
                                                    ></i>
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
                                    <Typography
                                        paddingX={5}
                                        fontWeight={"bold"}
                                        fontSize={30}
                                    >
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
                                            {state.post.descriptionContent}
                                        </Typography>
                                    </Grid>
                                </Box>
                            </Box>
                        </Stack>
                    </Col>
                    <Col className="position-sticky ps-2" style={{top: 0}} lg={5} md={12}>
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
                                                borderRight:
                                                    "1px solid" + colors.grey[500],
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
                                                <CldImage
                                                    id={state.user.thumbnailId}
                                                    w={60}
                                                    h={60}
                                                    r={50}
                                                    alt={"user image"}
                                                />
                                            </div>
                                            <div className="d-flex flex-column justify-content-between ps-3">
                                                <Typography
                                                    lineHeight={2}
                                                    fontSize={16}
                                                    className={"w-100"}
                                                >
                                                    {state.user.fullName}
                                                </Typography>
                                                <Typography
                                                    sx={{cursor: "pointer"}}
                                                    lineHeight={2}
                                                    fontSize={16}
                                                    className={"w-100"}
                                                    onClick={() =>
                                                        setState({
                                                            ...state,
                                                            isShowPhone:
                                                                !state.isShowPhone,
                                                        })
                                                    }
                                                >
                                                    SĐT:{" "}
                                                    {state.isShowPhone &&
                                                    state.user.phone
                                                        ? state.user.phone
                                                        : state.user.phone.substring(
                                                        0,
                                                        7,
                                                    ) + "xxx"}
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
                                                    {formatter(
                                                        state.post.createdAt
                                                            ? state.post.createdAt
                                                            : null,
                                                    )}
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
                                                borderRight:
                                                    "1px solid" + colors.grey[500],
                                                justifyContent: "center"
                                            }}
                                        >
                                            {
                                                state.post.status && state.post.status === REFUSED
                                                && <Typography fontSize={18} sx={{alignSelf: "center"}}>Bài viết đã thu
                                                    hồi</Typography>
                                            }
                                            {
                                                state.post.status && state.post.status === PUBLISHED
                                                && <Typography fontSize={18} sx={{alignSelf: "center"}}>Bài viết đã
                                                    đăng</Typography>
                                            }
                                            {
                                                state.post.status && state.post.status === PENDING_REVIEW
                                                &&
                                                <Typography fontSize={18} sx={{alignSelf: "center"}}>Bài viết đang chờ
                                                    xác
                                                    nhận</Typography>
                                            }
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box display={"flex"} justifyContent={"center"}>
                                                {
                                                    state.post.status
                                                    && state.post.status === PUBLISHED
                                                    && <Button onClick={handleChangePostStatus} variant={"contained"}
                                                               size={"large"}
                                                               color={"error"} value={REFUSED}>Khoá bài
                                                        viết <RemoveCircle/></Button>
                                                }
                                                {
                                                    state.post.status
                                                    && state.post.status === PENDING_REVIEW
                                                    && (<Stack spacing={2} direction={"column"}>
                                                        <Button onClick={handleChangePostStatus} variant={"contained"}
                                                                size={"large"}
                                                                color={"success"} value={PUBLISHED}>Đăng
                                                            bài <CheckCircleOutlined
                                                                sx={{marginLeft: 1}}/></Button>
                                                        <Button onClick={handleChangePostStatus} variant={"contained"}
                                                                size={"large"}
                                                                color={"error"} value={REFUSED}>Khoá bài viết <Block
                                                            sx={{marginLeft: 1}}/></Button>
                                                    </Stack>)
                                                }
                                                {
                                                    state.post.status
                                                    && state.post.status === REFUSED
                                                    && <Button onClick={handleChangePostStatus} variant={"contained"}
                                                               size={"large"}
                                                               color={"success"} value={PUBLISHED}>Đăng
                                                        bài <CheckCircleOutlined
                                                            sx={{marginLeft: 1}}/></Button>
                                                }
                                            </Box>
                                        </Grid>
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
                            {`Bạn có chắc chắn muốn ${state.modifyingStatus === PUBLISHED ? 'đăng' : 'thu hồi'} bài đăng này:`}
                        </h4>

                        <Stack direction="row" spacing={1}>

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
            </Container>)}
        </>
    );
}

export default PostDetails;