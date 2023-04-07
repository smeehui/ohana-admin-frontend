import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {Box, IconButton, ImageList, ImageListItem, Typography, useTheme} from "@mui/material";
import {toast} from "react-toastify";

import {cloudinayService, postService} from "~/service";
import styles from "./PostDetails.module.scss"
import clsx from "clsx";
import PostImagesModal from "~/pages/PostManagement/PostDetails/PostImagesModal";
import {tokens} from "~/theme";
import {HouseRounded} from "@mui/icons-material";
import {currencyFormatter} from "~/utils";


function PostDetails() {
    const {id} = useParams()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [state, setState] = useState({
        post: {},
        postImages: [],
        rentHouse: {},
        isLoadMore: false,
        imageClicked: false
    })
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
                        isLoadMore: images.length > 4
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
    return (
        <Container fluid>
            {state.imageClicked && <PostImagesModal isOpen={state.imageClicked} onClose={handleClick}/>}
            <Box className={"rounded-1"}>
                <ImageList variant="quilted"
                           cols={8}
                           rowHeight={121}>

                    {
                        state.postImages.map(img =>
                            <ImageListItem onClick={(e) => handleClick(img)} className={clsx({
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
                <Col lg={8}>
                    <Box borderRadius={5} display={"flex"} flexDirection={"column"} padding={3}
                         bgcolor={colors.grey[900]}>
                        <Box display={"flex"} justifyContent={"space-between"} borderRadius={50}
                             bgcolor={colors.grey[800]} width={"50%"} padding={0.5}>
                            <IconButton sx={{backgroundColor: "#eee"}}>
                                <HouseRounded fontSize={"large"} sx={{color: "#f73486"}}/>
                            </IconButton>
                            <Typography paddingRight={5} fontWeight={"bold"} fontSize={30}>Thông tin phòng</Typography>
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
                                    <Typography textTransform={"uppercase"}>{state.rentHouse.status}</Typography>
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
                </Col>
                <Col className="position-sticky" style={{top: 0}} lg={4}>
                    thông tin chủ
                </Col>
            </Box>
            <Box position="fixed" bottom={0} height={30}>
                Footer
            </Box>
        </Container>
    )
}

export default PostDetails;