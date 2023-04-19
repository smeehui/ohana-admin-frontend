import {GlobalActions} from "~/store/actionConstants";
import Cookies from 'js-cookie';
import useLocalStorage from "~/hooks/useLocalStorage";

const localStorage = useLocalStorage();
const initState = {
    post: {},
    user:{},
    utility: {},
    category:{},
    posts: [],
    users:[],
    utilities: [],
    categories:[],
    pageType: "",
    isSearching: false,
    isShowResults: false,
    isForceReloadPage:false,
    admin: {
        token: Cookies.get("jwtToken") || "",
        username: localStorage.get("username")||""
    }
}


const actions = {
    [GlobalActions.CHANGE_USER]: (action,state) => {
        return {...state,user: action.payload}
    },
    [GlobalActions.SET_USER_INFO]: (action, state) => {
        const {posts,user,pageType} = action.payload;
        return {...state,posts,user,pageType}
    },
    [GlobalActions.SET_USERS]: (action, state) => {
        return {...state,users: action.payload}
    },
    [GlobalActions.SET_POST_INFO]: (action,state) => {
        const {post,pageType} = action.payload;
        return {...state,post,pageType}
    },
    [GlobalActions.SET_POSTS]: (action, state) => {
        return {...state,posts: action.payload}
    },
    [GlobalActions.CHANGE_CATEGORY]: (action,state) => {
        return {...state,category: action.payload}
    },
    [GlobalActions.CHANGE_UTILITY]: (action,state) => {
        return {...state,utility: action.payload}
    },
    [GlobalActions.SET_PAGE_TYPE]: (action,state) => {
        return {...state,pageType: action.payload}
    },
    [GlobalActions.SEARCH]: (action,state) => {
        return {...state,isSearching: true}
    },
    [GlobalActions.END_SEARCH]: (action,state) => {
        return {...state,isSearching: false, isShowResults: action.payload.isShowResults}
    },
    [GlobalActions.CLEAR_SEARCH]: (action,state) => {
        return {...state,isSearching: false, isShowResults: false}
    },
    [GlobalActions.LOGGED_IN]: (action,state) => {
        localStorage.save("username",action.payload.username)
        return {...state,admin: action.payload}
    },
    [GlobalActions.LOGGED_OUT]: (action,state) => {
        localStorage.remove("username");
        return {...state,admin: {}}
    },
}


const reducer = (state,action, ...args) => {
    if (action.type) {
        return actions[action.type](action,state, args);
    }
    return initState;
};
export {initState}
export default reducer;
