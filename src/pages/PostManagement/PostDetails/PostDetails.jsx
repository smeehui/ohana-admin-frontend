import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {Box, Grid, IconButton, ImageList, ImageListItem, Stack, Typography, useTheme} from "@mui/material";
import {toast} from "react-toastify";

import {cloudinayService, postService} from "~/service";
import styles from "./PostDetails.module.scss"
import clsx from "clsx";
import PostImagesModal from "~/pages/PostManagement/PostDetails/PostImagesModal";
import {tokens} from "~/theme";
import {ErrorOutlined, HouseRounded, LocalLaundryService, Person} from "@mui/icons-material";
import {currencyFormatter} from "~/utils";
import CldImage from "~/components/CldImage";
import dateTimeFormatter from "~/utils/dateTimeFormatter";
import "~/assets/css/ohanaIcons.css"

function PostDetails() {
    const {id} = useParams()
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
            phone: ""
        },
        isShowPhone: false
    })

    const boxStyles = useMemo(() => ({
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        padding: 3,
        bgcolor: colors.primary[400]
    }), [theme.palette.mode]);

    useEffect(() => {
        (async () => {
            try {
                let post = await postService.getPostById(id);
                setState(prevState => {
                    const images = post.postMedia.map((img, index) => {
                        let cols = index === 0 ? 4 : 2;
                        let rows = index === 0 ? 4 : 2;
                        let isHidden = index > 4;
                        let size = 100;
                        return srcset(img, size, rows, cols, isHidden, index);
                    })
                    return {
                        ...prevState,
                        post: post,
                        rentHouse: post.rentHouse,
                        postImages: images,
                        isLoadMore: images.length > 4,
                        user: post.user
                    }
                })
            } catch (e) {
                toast.error("Lấy dữ liệu post thất bại");
            }
        })();
    }, []);

    function srcset(image, size, rows = 1, cols = 1, isHidden, index) {
        return {
            url: cloudinayService.generateImageById(image.id, {width: size * cols, height: size * rows, r: 10}),
            rows: rows,
            cols: cols,
            isHidden: isHidden,
            index: index
        }

    }

    const handleClick = useCallback(
        (e) => {
            setState({...state, imageClicked: !state.imageClicked})
        },
        [state]
    );
    console.log(state.user.phone)
    return (
        <Container fluid>
            {state.imageClicked && <PostImagesModal isOpen={state.imageClicked} onClose={handleClick}/>}
            <Box borderRadius={2}>
                <ImageList variant="quilted"
                           cols={8}
                           rowHeight={121}>

                    {
                        state.postImages.map(img =>
                            <ImageListItem onClick={(e) => handleClick(img)} className={clsx("rounded rounded-3 overflow-hidden", {
                                [styles["load-more"]]: img.index === 4 && state.postImages.length > 5,

                            })}
                                           hidden={img.isHidden}
                                           sx={{
                                               [`&.${styles["load-more"]}::after`]: {
                                                   content: `"+${state.postImages.length - 5}"`
                                               }
                                           }}
                                           key={img.url} cols={img.cols || 1}
                                           rows={img.rows || 1}>
                                <img alt={"Post image"} src={img.url}/>
                            </ImageListItem>)
                    }

                </ImageList>
            </Box>
            <h2>{state.post.title}</h2>
            <Box display="flex" height={800}>
                <Col lg={8} className="pe-2">
                    <Stack direction={"column"} spacing={2}>
                        <Box {...boxStyles}>
                            <Box display={"flex"} justifyContent={"space-between"} borderRadius={50}
                                 bgcolor={colors.grey[900]} width={"fit-content"} padding={0.5}>
                                <IconButton sx={{backgroundColor: "#eee"}}>
                                    <HouseRounded fontSize={"large"} sx={{color: "#f73486"}}/>
                                </IconButton>
                                <Typography paddingX={5} fontWeight={"bold"} fontSize={30}>Thông tin phòng</Typography>
                            </Box>
                            <Box marginTop={2}
                                 sx={{
                                     "& .MuiTypography-root ": {
                                         fontWeight: "bold"
                                     }
                                 }}
                            >
                                <Row>
                                    <Col lg={3}>
                                        <Typography textTransform={"uppercase"}>GIÁ PHÒNG</Typography>
                                        <Typography
                                            textTransform={"uppercase"}>{currencyFormatter.vndFormatter(state.rentHouse.price)}</Typography>
                                    </Col>
                                    <Col lg={3}>
                                        <Typography textTransform={"uppercase"}>DIỆN TÍCH</Typography>
                                        <Typography textTransform={"uppercase"}>{state.rentHouse.area} mét
                                            vuông</Typography>
                                    </Col>
                                    <Col lg={3}>
                                        <Typography textTransform={"uppercase"}>ĐẶT CỌC</Typography>
                                        <Typography textTransform={"uppercase"}>1,0000,000 Đồng</Typography>
                                    </Col>
                                    <Col lg={3}>
                                        <Typography textTransform={"uppercase"}>SỨC CHỨA</Typography>
                                        <Typography textTransform={"uppercase"}>{state.rentHouse.capacity}</Typography>
                                    </Col>
                                </Row>
                                <Row className={"my-3"}>
                                    <Col lg={3}>
                                        <Typography textTransform={"uppercase"}>ĐIỆN</Typography>
                                        <Typography textTransform={"uppercase"}>1,0000,000 Đồng</Typography>
                                    </Col>
                                    <Col lg={3}>
                                        <Typography textTransform={"uppercase"}>NƯỚC</Typography>
                                        <Typography textTransform={"uppercase"}>1,0000,000 Đồng</Typography>
                                    </Col>
                                    <Col lg={3}>
                                        <Typography textTransform={"uppercase"}>WIFI</Typography>
                                        <Typography textTransform={"uppercase"}>1,0000,000 Đồng</Typography>
                                    </Col>
                                    <Col lg={3}>
                                        <Typography textTransform={"uppercase"}>TRẠNG THÁI</Typography>
                                        <Typography textTransform={"uppercase"}
                                                    color={state.rentHouse.status ? "success" : "error"}>{state.rentHouse.status ? "Còn trống" : "Đã cho thuê"}</Typography>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography textTransform={"uppercase"}>ĐỊA CHỈ</Typography>
                                        <Typography>
                                            {
                                                state.post.location && `${state.post.location.line1}, ${state.post.location.wardName}, ${state.post.location.districtName}, ${state.post.location.provinceName}`
                                            }
                                        </Typography>
                                    </Col>
                                </Row>
                            </Box>
                        </Box>
                        <Box {...boxStyles}>
                            <Box display={"flex"} justifyContent={"space-between"} borderRadius={50}
                                 bgcolor={colors.grey[900]} width={"fit-content"} padding={0.5}>
                                <IconButton sx={{backgroundColor: "#eee"}}>
                                    <LocalLaundryService fontSize={"large"} sx={{color: colors.greenAccent[500]}}/>
                                </IconButton>
                                <Typography paddingX={5} fontWeight={"bold"} fontSize={30}>Tiện ích</Typography>
                            </Box>
                            <Box marginTop={2}
                                 sx={{
                                     "& .MuiTypography-root ": {
                                         fontWeight: "bold"
                                     }
                                 }}
                            >
                                <Grid container direction={"row"} spacing={1}>
                                    {
                                        state.post.utilities && state.post.utilities
                                            .map(util =>
                                                <Grid key={util.id} style={{fontSize: "2rem"}} item xs={3} display={"flex"}>
                                                    <i className={clsx(util.icon)}></i>
                                                    <Typography fontSize={16} marginX={3} sx={3} alignContent={"center"}
                                                                lineHeight={2.5}>
                                                        {util.name}
                                                    </Typography>
                                                </Grid>
                                            )
                                    }
                                </Grid>
                            </Box>
                        </Box>
                        <Box {...boxStyles}>
                            <Box display={"flex"} justifyContent={"space-between"} borderRadius={50}
                                 bgcolor={colors.grey[900]} width={"fit-content"} padding={0.5}>
                                <IconButton sx={{backgroundColor: "#eee"}}>
                                    <ErrorOutlined fontSize={"large"} sx={{color: colors.blueAccent[500]}}/>
                                </IconButton>
                                <Typography paddingX={5} fontWeight={"bold"} fontSize={30}>Mô tả thêm</Typography>
                            </Box>
                            <Box marginTop={2}
                                 sx={{
                                     "& .MuiTypography-root ": {
                                         fontWeight: "bold"
                                     }
                                 }}
                            >
                                <Grid container direction={"row"} spacing={1}>
                                    <Typography fontSize={16}>{state.post.descriptionContent}</Typography>
                                </Grid>
                            </Box>
                        </Box>
                    </Stack>
                </Col>
                <Col className="position-sticky ps-2" style={{top: 0}} lg={4}>
                    <Box {...boxStyles}>
                        <Box display={"flex"} justifyContent={"space-between"} borderRadius={50}
                             bgcolor={colors.grey[900]} width={"fit-content"} padding={0.5}>
                            <IconButton sx={{backgroundColor: "#eee"}}>
                                <Person fontSize={"large"} sx={{color: colors.blueAccent[500]}}/>
                            </IconButton>
                            <Typography paddingX={5} fontWeight={"bold"} fontSize={30}>Thông tin phòng</Typography>
                        </Box>
                        <Stack sx={{marginTop: 2, "& .MuiTypography-root": {fontWeight: "bold"}}}>
                            <Grid container direction={"row"}>
                                <Grid item xs={6} sx={{display: "flex", borderRight: "1px solid" + colors.grey[500]}}>
                                    <div style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "50%",
                                        backgroundColor: colors.grey[900],
                                        margin: "0 5px"
                                    }}>
                                        <CldImage id={state.user.thumbnailId} w={60} h={60} r={50} alt={"user image"}/>
                                    </div>
                                    <div className="d-flex flex-column justify-content-between ps-3">
                                        <Typography lineHeight={2} fontSize={16}
                                                    className={"w-100"}>{state.user.fullName}</Typography>
                                        <Typography sx={{cursor: "pointer"}} lineHeight={2} fontSize={16}
                                                    className={"w-100"} onClick={() => setState({
                                            ...state,
                                            isShowPhone: !state.isShowPhone
                                        })}>
                                            SĐT: {
                                            (state.isShowPhone && state.user.phone)
                                                ? state.user.phone
                                                : state.user.phone.substring(0, 7) + "xxx"
                                        }
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="d-flex flex-column justify-content-between ps-3">
                                        <Typography lineHeight={2} fontSize={16} className={"w-100"}>Ngày
                                            đăng:</Typography>
                                        <Typography lineHeight={2} fontSize={16}
                                                    className={"w-100"}>{formatter(state.post.createdAt ? state.post.createdAt : null)}</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Box>
                </Col>
            </Box>
            <Box position="fixed" bottom={0} height={30}>
                Footer
            </Box>
        </Container>
    )
}

export default PostDetails;