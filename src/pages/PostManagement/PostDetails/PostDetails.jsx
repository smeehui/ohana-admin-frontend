import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Col, Container} from "react-bootstrap";
import {Box} from "@mui/material";
import {toast} from "react-toastify";
import {postService} from "~/service";

function PostDetails (){
    const {id} = useParams()
    const [state,setState] = useState({
        post: {}
    })

    useEffect(() => {
        ( async () => {
            try {
                let post = await postService.getPostById(id);
                setState(prevState=>({...prevState,post: post}))
            }
            catch (e) {
                toast.error("Lấy dữ liệu post thất bại");
                console.log(e)
            }
        })();
    }, []);


    return (
       <Container>
           <Box width="100%" height="400px">
                Ảnh ở đây
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