import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import CldImage from "~/components/CldImage";
import {Col, Container} from "react-bootstrap";

function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

function isImage(element) {
    return element.tagName === "img"
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
    const {width, value} = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const {field} = props.params;
    const {postMedia} = props.params.row;

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        const isImageElement = isImage(cellValue.current);
        setShowPopper(isCurrentlyOverflown || isImageElement);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                transition: "250ms ease"
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: '100%',
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
            >
                {field !== "thumbnailId" ? value : <CldImage id={value}/>}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    placement="right-end"
                >
                    <Paper
                        elevation={1}
                        style={{minHeight: wrapper.current.offsetHeight - 3, maxWidth: "400px"}}

                    >
                        {
                            field !== "thumbnailId"
                                ? <Typography variant="body2" style={{padding: 8}}>
                                    {value}
                                </Typography>
                                : postMedia ?
                                    <Box borderRadius={5}>
                                        <Typography className="px-2" style={{flex: 1}}>Tất cả ảnh</Typography>
                                        <Container className={"d-flex flex-wrap overflow-scroll"}
                                                   style={{maxHeight: "500px"}}>
                                            {
                                                postMedia.map(img =>
                                                    <Col key={img.id} className="rounded-1" lg={3}>
                                                        <CldImage r={1} w={90} h={90} id={img.id}/>
                                                    </Col>)
                                            }
                                        </Container>
                                    </Box>
                                    : null
                        }
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

export default GridCellExpand;