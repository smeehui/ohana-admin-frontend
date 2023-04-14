import {useEffect, useReducer} from "react";
import GlobalContext from "~/store/GlobalContext";
import reducer, {initState} from './reducer'
import {useTheme} from "@mui/material";
import {tokens} from "~/theme";
import {GlobalActions} from "~/store/actionConstants";


function Provider({children}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [state, dispatch] = useReducer(reducer, initState);
    const tableStyles = {
        "& .MuiDataGrid-root": {
            border: "none",
        },
        "& .MuiDataGrid-cell": {
            borderBottom: "none",
        },
        "& .MuiDataGrid-cell:hover": {
            cursor: "pointer"
        },
        "& .MuiDataGrid-root .MuiDataGrid-cell:focus-within":
            {
                outline: "none !important"
            }
        ,
        "& .name-column--cell": {
            color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
        },
    }
    useEffect(() => {
        dispatch({type: GlobalActions.CHANGE_COLOR, payload: tableStyles}, state,colors)
    }, [theme.palette.mode])

    return (
        <GlobalContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalContext.Provider>
    );
}

export default Provider;
