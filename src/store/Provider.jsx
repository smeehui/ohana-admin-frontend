import {useEffect, useReducer} from "react";
import GlobalContext from "~/store/GlobalContext";
import reducer, {initState} from './reducer'
import {useTheme} from "@mui/material";
import {tokens} from "~/theme";
import {GlobalActions} from "~/store/actionConstants";


function Provider({children}) {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <GlobalContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalContext.Provider>
    );
}

export default Provider;
