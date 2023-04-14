import React, {useContext, useEffect, useRef, useState} from 'react'
import InputBase from "@mui/material/InputBase";
import {
    Avatar,
    Box,
    CircularProgress,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListSubheader,
    useTheme
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {tokens} from "~/theme";
import defaultUserAvt from "~/assets/img/default-user.png"
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

function Search() {
    const theme = useTheme();
    const searchRef = useRef();
    const popperRef = useRef();
    const navigate = useNavigate();

    const colors = tokens(theme.palette.mode);
    const [keyword, setKeyword] = useState("")
    const [globalState, globalDispatch] = useContext(AppContext);

    const [searchState, setSearchState] = useState({
        postResults: [],
        userResults: []
    })
    const debouncedKeyword = useDebounce(keyword, 500)
    const {isSearching, isShowResults} = globalState;
    const isMount = useIsMount()

    useOnClickOutside(popperRef, () => {
        setSearchState({...searchState, isSearching: false, isShowResults: false})
    })

    let showPopper = true;
    const handleSearch = (e) => {
        setKeyword(e.target.value)
    }
    useEffect(() => {
        if (!isMount && debouncedKeyword.length >= 3) {
            (async () => {
                globalDispatch({type: GlobalActions.SEARCH})
                const posts = await postService.filterPosts({keyword}, {page: 0, size: 100})
                const users = await userService.filterUsers({keyword}, {page: 0, size: 100})
                globalDispatch({
                    type: GlobalActions.END_SEARCH,
                    payload: {
                        isShowResults: posts.content.length > 0 || users.content.length > 0
                    }
                })
                setSearchState({
                    postResults: posts.content,
                    userResults: users.content
                })
            })()
        }
        if (debouncedKeyword.trim().length == 0) {
            globalDispatch({type: GlobalActions.CLEAR_SEARCH})
            setSearchState({
                    postResults: [],
                    userResults: []
                }
            )
        }
    }, [debouncedKeyword])
    return (
        <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            ref={searchRef}
        >
            <InputBase sx={{ml: 2, flex: 1, minWidth: 250}} placeholder="Search" value={keyword}
                       onChange={handleSearch}/>
            {
                showPopper
                && searchRef.current
                && (
                    <Popper
                        ref={popperRef}
                        open={isShowResults}
                        placement="bottom-start"
                        anchorEl={searchRef.current}
                        style={{zIndex: 99, borderRadius: "5px", overflow: "hidden"}}
                        disablePortal={false}
                        modifiers={[{
                                name: "offset",
                                options: {
                                    offset: [0, 10],
                                }
                            },]
                        }
                        sx={{
                            "& .MuiList-root": {
                                padding: "2px 5px"
                            }
                        }}
                    >
                        <Grid direction={"column"} gap={2} padding={1} container
                              sx={{
                                  bgcolor: 'background.paper',
                                  "& .MuiListItem-root": {
                                      transition: "250ms ease",
                                      borderRadius: 2
                                  },

                                  "& .MuiListItem-root:hover": {
                                      bgcolor: colors.pink[300],
                                      cursor: "pointer"
                                  }
                              }}

                        >
                            {
                                searchState.userResults.length > 0
                                &&
                                <Grid
                                    item
                                    position={"relative"}
                                    border={"1px solid " + colors.grey[700]}
                                    borderRadius={2}
                                >
                                    <List sx={{
                                        width: '100%',
                                        maxWidth: 350,
                                        minWidth: 300,
                                        maxHeight: 300,
                                        overflowY: "scroll"
                                    }}
                                          subheader={<ListSubheader sx={{lineHeight: 2, background: 'background.paper'}}>Nguời
                                              dùng</ListSubheader>}>
                                        {
                                            searchState.userResults.map(item => {
                                                return (
                                                    <ListItem key={item.id}
                                                              onClick={() => {
                                                                  navigate(config.routes.userDetails + `${item.id}`)
                                                                  globalDispatch({type: GlobalActions.CLEAR_SEARCH})
                                                              }}>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                {
                                                                    item.thumbnailId
                                                                        ?
                                                                        <CldImage w={60} h={60} r={60} id={item.thumbnailId}
                                                                                  alt={item.fullName}/>
                                                                        : <img src={defaultUserAvt} alt={item.fullName}
                                                                               width={60} height={60}
                                                                               style={{borderRadius: "50%"}}/>
                                                                }
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={item.fullName} secondary={item.address}/>
                                                    </ListItem>)
                                            })
                                        }
                                    </List>
                                </Grid>
                            }
                        </Grid>
                        <Grid
                            direction={"column"}
                            gap={2}
                            padding={1}
                            container
                            sx={{
                                bgcolor: 'background.paper',
                                "& .MuiListItem-root": {
                                    transition: "250ms ease",
                                    borderRadius: 2
                                },

                                "& .MuiListItem-root:hover": {
                                    bgcolor: colors.pink[300],
                                    cursor: "pointer"
                                }
                            }}>
                            {
                                searchState.postResults.length > 0
                                &&
                                <Grid item position={"relative"} border={"1px solid " + colors.grey[700]} borderRadius={2}>
                                    <List sx={{
                                        width: '100%',
                                        maxWidth: 350,
                                        minWidth: 300,
                                        maxHeight: 300,
                                        overflowY: "scroll"
                                    }}
                                          subheader={<ListSubheader sx={{lineHeight: 2, background: 'background.paper'}}>Bài
                                              viết</ListSubheader>}>
                                        {
                                            searchState.postResults.map(item => {
                                                return (
                                                    <ListItem key={item.id}
                                                              onClick={() => {
                                                                  navigate(config.routes.postDetails + `${item.id}`)
                                                                  globalDispatch({type: GlobalActions.CLEAR_SEARCH})
                                                              }}>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                {
                                                                    item.thumbnailId
                                                                        ?
                                                                        <CldImage w={60} h={60} r={60} id={item.thumbnailId}
                                                                                  alt={item.title}/>
                                                                        : <img src={defaultUserAvt} alt={item.title}
                                                                               width={60} height={60}
                                                                               style={{borderRadius: "50%"}}/>
                                                                }
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={item.title}
                                                                      secondary={item.location.line1 + " ," + item.location.wardName}/>
                                                    </ListItem>)
                                            })
                                        }
                                    </List>
                                </Grid>
                            }
                        </Grid>
                    </Popper>
                )}
            <IconButton onClick={() => setKeyword("")} type="button" sx={{p: 1}}>
                {
                    isSearching
                    ?<CircularProgress color="success" size={20}/>
                    :keyword.length > 0
                    ?<Cancel color="secondary" size={15}/>
                    : <SearchIcon size={15}/>
                }
            </IconButton>
        </Box>
    );
}

export default Search
