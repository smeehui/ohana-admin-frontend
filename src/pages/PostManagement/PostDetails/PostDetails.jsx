import React, {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import {Col, Container} from "react-bootstrap";
import {Box} from "@mui/material";
import {toast} from "react-toastify";

import {cloudinayService, postService} from "~/service";


function PostDetails() {
    const {id} = useParams()
    const [state, setState] = useState({
        post: {},
        postImages: []
    })
    const responsive = useMemo(() => ({
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 4
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 3
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    }), []);

    useEffect(() => {
        (async () => {
            try {
                let post = await postService.getPostById(id);
                setState(prevState => {
                    const images = post.postMedia.map(img => cloudinayService.generateImageById(img.id, {width: 400, height: 400, r: 2}))
                    return {...prevState, post: post, postImages: images}
                })
            }
            catch (e) {
                toast.error("Lấy dữ liệu post thất bại");
                console.log(e)
            }
        })();
    }, []);
    return (
        <Container fluid>
            <Box padding={"0 40px"}>
            </Box>
            <h2>Title ở đây</h2>
            <Box display="flex" height={800}>
                <Col lg={8}>
                    Main content
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