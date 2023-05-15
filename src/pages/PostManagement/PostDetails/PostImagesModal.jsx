import * as React from 'react';
import {useEffect, useMemo, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {cloudinaryService, postService} from "~/service";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"
import {Grow, Typography, useTheme} from "@mui/material";
import {CancelOutlined, Downloading} from "@mui/icons-material";
import noImage from '~/resources/assets/img/no-image.jpg'
import {tokens} from "~/theme";


function PostImagesModal({isOpen, onClose}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [state, setState] = useState({
        open: isOpen,
        images: [],
        isLoading: false
    })
    const {id} = useParams()
    const {open, images} = state;
    const style = useMemo(() => ({
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        p: 4,
        width: "100%"
    }), []);

    useEffect(() => {
        (async () => {
            setState({...state, isLoading: true})
            try {
                let post = await postService.getPostById(id);
                setState(prevState => {
                    const images = post.postMedia.map(img => ({
                        original: cloudinaryService.generateImageById(img.publicId, {width: 600, height: 600}),
                        thumbnail: cloudinaryService.generateImageById(img.publicId, {width: 90, height: 90}),
                        renderItem: item => {
                            return <div style={{width: "100%", height: "600px", alignSelf: "center"}}>
                                <img onError={({currentTarget}) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = noImage;
                                }}
                                     alt={"Post image"} src={item.original}/>
                            </div>
                        },
                    }))
                    return {...prevState, images: images, isLoading: false}
                })
            } catch (e) {
                toast.error("Lấy dữ liệu post thất bại");
            }
        })();
    }, []);

    const handleImgError = (e) => {
        e.target.src = noImage;
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                sx={{bgcolor: "#000000ad"}}
            >
                <Grow in={open}
                      {...(open ? {timeout: 1000} : {})}
                      style={{position: "relative", width: "100%", height: "100%"}}
                >
                    {state.isLoading
                        ? <Box><Downloading/></Box>
                        : <Box sx={style}>
                            <Box
                                position={"absolute"}
                                color={"white"}
                                top={10}
                                right={"25%"}
                            >
                                <Typography sx={{
                                    transition: "250ms ease",
                                    "& .MuiSvgIcon-root:hover":
                                        {color: colors.pink[400]}
                                }}>
                                    <CancelOutlined
                                        role={"button"}
                                        fontSize={"large"}
                                        onClick={onClose}
                                    />
                                </Typography>
                            </Box>
                            <ImageGallery onThumbnailError={handleImgError} showFullscreenButton={false}
                                          showPlayButton={false} lazyLoad={true} thumbnailPosition={"right"}
                                          items={images}/>
                        </Box>
                    }
                </Grow>
            </Modal>
        </div>
    );
}

export default PostImagesModal;