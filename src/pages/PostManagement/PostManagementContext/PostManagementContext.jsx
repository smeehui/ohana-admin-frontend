import React, {createContext, useReducer} from "react";
import {PostStatus} from "~/pages/PostManagement/ListPost/constants/PostStatus";

export const PostContext = createContext();

const initState = {
    filter: {
        keyword: "",
        status: PostStatus.PENDING_REVIEW,
    },
    doFilter: false,
};

export const postManagementActions = {
    SET_FILTER: "SET_FILTER",
    DO_FILTER: "DO_FILTER",
}

const actions = {
    [postManagementActions.SET_FILTER]: (action,state)=>{
        console.log(action)
        return {...state, filter: {...state.filter,...action.payload}}
    },
    [postManagementActions.DO_FILTER]: (action,state)=>{
        action.payload();
        return {...state, doFilter: !state.doFilter}
    },
}

const reducer = (state,action, ...args) => {
    if (action.type && actions[action.type]) {
        return actions[action.type](action,state, args);
    }
    return state;
};

function PostManagementContext({children}) {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <PostContext.Provider value={[state, dispatch]}>
            {children}
        </PostContext.Provider>
    );
}

export default PostManagementContext

