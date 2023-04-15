import React, {useContext, useEffect, useRef, useState} from "react";
import InputBase from "@mui/material/InputBase";
import {
    Avatar,
    Box, Button,
    CircularProgress,
    Fade,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListSubheader,
    Typography,
    useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {tokens} from "~/theme";
import Popper from "@mui/material/Popper";
import useDebounce from "~/hooks/useDebounce";
import {postService, userService} from "~/service";
import {useIsMount} from "~/hooks/useIsMount";
import CldImage from "~/components/CldImage";
import {Cancel} from "@mui/icons-material";
import useOnClickOutside from "~/hooks/useOnclickOutSide";
import {useNavigate} from "react-router-dom";
import {config} from "~/config";
import {AppContext} from "~/store";
import {GlobalActions} from "~/store/actionConstants";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide easing={"enter"} ref={ref} {...props} />;
});
function Search() {
    const theme = useTheme();
    const searchRef = useRef();
    const popperRef = useRef();
    const navigate = useNavigate();

    const colors = tokens(theme.palette.mode);
    const [keyword, setKeyword] = useState("");
    const [globalState, globalDispatch] = useContext(AppContext);

    const [searchState, setSearchState] = useState({
        postResults: [],
        userResults: [],
    });
    const debouncedKeyword = useDebounce(keyword, 500);
    const {isSearching, isShowResults} = globalState;
    const isMount = useIsMount();

    useOnClickOutside(popperRef, () => {
        globalDispatch({
            type: GlobalActions.END_SEARCH,
            payload: {
                isShowResults: false,
            },
        });
    });

    let showPopper = true;
    const handleSearch = (e) => {
        setKeyword(e.target.value);
    };
    useEffect(() => {
        if (!isMount && debouncedKeyword.length >= 3) {
            (async () => {
                globalDispatch({type: GlobalActions.SEARCH});
                const posts = await postService.filterPosts(
                    {keyword},
                    {page: 0, size: 100},
                );
                const users = await userService.filterUsers(
                    {keyword},
                    {page: 0, size: 100},
                );
                globalDispatch({
                    type: GlobalActions.END_SEARCH,
                    payload: {
                        isShowResults: true,
                    },
                });
                setSearchState({
                    postResults: posts.content,
                    userResults: users.content,
                });
            })();
        }
        if (debouncedKeyword.trim().length == 0) {
            globalDispatch({type: GlobalActions.CLEAR_SEARCH});
            setSearchState({
                postResults: [],
                userResults: [],
            });
        }
    }, [debouncedKeyword]);
    const isNoResults =
        searchState.userResults.length === 0 &&
        searchState.postResults.length === 0;
    return (
        <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            ref={searchRef}
        >
            <InputBase
                sx={{
                    ml: 2,
                    flex: 1,
                    minWidth: 250,
                    caretColor: colors.pink[500],
                    transition: "all 250ms ease",
                }}
                placeholder="Tìm kiếm người dùng hoặc bài viết..."
                value={keyword}
                onChange={handleSearch}
                onFocus={() =>
                    globalDispatch({
                        type: GlobalActions.END_SEARCH,
                        payload: {isShowResults: !isNoResults},
                    })
                }
            />
            <Popper
                ref={popperRef}
                open={isShowResults}
                placement="bottom-start"
                anchorEl={searchRef.current}
                style={{zIndex: 99, borderRadius: "5px", overflow: "hidden"}}
                disablePortal={false}
                modifiers={[
                    {
                        name: "offset",
                        options: {
                            offset: [0, 10],
                        },
                    },
                ]}
                transition
                sx={{
                    "& .MuiList-root": {
                        padding: "0px 5px",
                    },
                }}
            >
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box flex={1} flexDirection={"column"} display={"flex"}>
                            {searchState.userResults.length > 0 && (
                                <Grid
                                    direction={"column"}
                                    gap={2}
                                    padding={1}
                                    container
                                    sx={{
                                        bgcolor: "background.paper",
                                        "& .MuiListItem-root": {
                                            transition: "250ms ease",
                                            borderRadius: 2,
                                        },

                                        "& .MuiListItem-root:hover": {
                                            bgcolor: colors.pink[300],
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <Grid
                                        item
                                        position={"relative"}
                                        borderRadius={2}
                                    >
                                        <List
                                            sx={{
                                                width: "100%",
                                                maxWidth: 350,
                                                minWidth: 300,
                                                maxHeight: 250,
                                                overflowY: "scroll",
                                            }}
                                            subheader={
                                                <ListSubheader
                                                    sx={{
                                                        lineHeight: 2,
                                                        background:
                                                            "background.paper",
                                                    }}
                                                >
                                                    Nguời dùng
                                                </ListSubheader>
                                            }
                                        >
                                            {searchState.userResults.map(
                                                (item) => {
                                                    return (
                                                        <ListItem
                                                            key={item.id}
                                                            onClick={() => {
                                                                navigate(
                                                                    config
                                                                        .routes
                                                                        .userDetails +
                                                                    `${item.id}`,
                                                                );
                                                                globalDispatch({
                                                                    type: GlobalActions.CLEAR_SEARCH,
                                                                });
                                                            }}
                                                        >
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                    <CldImage
                                                                        w={60}
                                                                        h={60}
                                                                        r={60}
                                                                        id={item.thumbnailId}
                                                                        alt={item.fullName}
                                                                    />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={
                                                                    item.fullName
                                                                }
                                                                secondary={
                                                                    item.address
                                                                }
                                                            />
                                                        </ListItem>
                                                    );
                                                },
                                            )}
                                        </List>
                                    </Grid>
                                </Grid>
                            )}

                            {searchState.postResults.length > 0 && (
                                <Grid
                                    direction={"column"}
                                    gap={2}
                                    padding={1}
                                    container
                                    sx={{
                                        bgcolor: "background.paper",
                                        "& .MuiListItem-root": {
                                            transition: "250ms ease",
                                            borderRadius: 2,
                                        },

                                        "& .MuiListItem-root:hover": {
                                            bgcolor: colors.pink[300],
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <Grid
                                        item
                                        position={"relative"}
                                        borderRadius={2}
                                    >
                                        <List
                                            sx={{
                                                width: "100%",
                                                maxWidth: 350,
                                                minWidth: 300,
                                                maxHeight: 250,
                                                overflowY: "scroll",
                                            }}
                                            subheader={
                                                <ListSubheader
                                                    sx={{
                                                        lineHeight: 2,
                                                        background:
                                                            "background.paper",
                                                    }}
                                                >
                                                    Bài viết
                                                </ListSubheader>
                                            }
                                        >
                                            {searchState.postResults.map(
                                                (item) => {
                                                    return (
                                                        <ListItem
                                                            key={item.id}
                                                            onClick={() => {
                                                                navigate(
                                                                    config
                                                                        .routes
                                                                        .postDetails +
                                                                    `${item.id}`,
                                                                );
                                                                globalDispatch({
                                                                    type: GlobalActions.CLEAR_SEARCH,
                                                                });
                                                            }}
                                                        >
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                    <CldImage
                                                                        w={60}
                                                                        h={60}
                                                                        r={60}
                                                                        id={item.thumbnailId}
                                                                        alt={item.title}
                                                                    />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={item.title}
                                                                secondary={
                                                                    item
                                                                        .location
                                                                        .line1 +
                                                                    " ," +
                                                                    item
                                                                        .location
                                                                        .wardName
                                                                }
                                                            />
                                                        </ListItem>
                                                    );
                                                },
                                            )}
                                        </List>
                                    </Grid>
                                </Grid>
                            )}

                            {isNoResults && (
                                <Grid
                                    direction={"column"}
                                    gap={2}
                                    padding={1}
                                    container
                                    sx={{
                                        bgcolor: "background.paper",
                                        "& .MuiListItem-root": {
                                            transition: "250ms ease",
                                            borderRadius: 2,
                                        },

                                        "& .MuiListItem-root:hover": {
                                            bgcolor: colors.pink[300],
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <Grid
                                        item
                                        borderRadius={2}
                                        display={"flex"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        sx={{
                                            width: "100%",
                                            maxWidth: 350,
                                            minWidth: 290,
                                            maxHeight: 300,
                                        }}
                                    >
                                        <Typography variant={"primary"}>
                                            Không tìm thấy kết quả nào
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                    </Fade>
                )}
            </Popper>
            <Box
                sx={{p: 1,position: "relative",width: 36}}
            >
                <Fade in={isSearching}>
                    <IconButton sx={{position: "absolute",top: 0,left: 0}}>
                        <CircularProgress color="success" size={20}/>
                    </IconButton>
                </Fade>
                <Fade in={keyword.length > 0 &&!isSearching} onClick={() => setKeyword("")}>
                    <IconButton sx={{position: "absolute",top: 0,left: 0}}>
                        <Cancel color="secondary"size={15}/>
                    </IconButton>
                </Fade>
                <Fade in={keyword.length === 0}>
                    <IconButton sx={{position: "absolute",top: 0,left: 0}}>
                        <SearchIcon size={15}/>
                    </IconButton>
                </Fade>
            </Box>
        </Box>
    );
}

export default Search;
