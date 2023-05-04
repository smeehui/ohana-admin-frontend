import React, {createContext, useReducer} from "react";
import {PostStatus} from "~/pages/PostManagement/ListPost/constants/PostStatus";
import {UserStatus} from "~/pages/UserManagement/constants/UserStatus";

export const UserContext = createContext();

const initState = {
    filter: { keyword: "",
        status: UserStatus.CONFIRM_EMAIL,
        role: undefined,
    },
    doFilter: false,
};

export const userManagementActions = {
    SET_FILTER: "SET_FILTER",
    DO_FILTER: "DO_FILTER",
    RESET_FILTER: "RESET_FILTER",
}

const actions = {
    [userManagementActions.SET_FILTER]: (action,state)=>{
        console.log(action)
        return {...state, filter: {...state.filter,...action.payload}}
    },
    [userManagementActions.DO_FILTER]: (action,state)=>{
        action.payload();
        return {...state, doFilter: !state.doFilter}
    },
    [userManagementActions.RESET_FILTER]: (action,state)=>{
        return {...state, doFilter: !state.doFilter,filter:initState}
    },
}

const reducer = (state,action, ...args) => {
    if (action.type && actions[action.type]) {
        return actions[action.type](action,state, args);
    }
    return state;
};

function UserManagementContext({children}) {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    );
}

export default UserManagementContext

