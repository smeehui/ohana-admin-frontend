import { useReducer } from "react";
import GlobalContext from "~/store/GlobalContext";
import reducer, {initState} from './reducer'


function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <GlobalContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalContext.Provider>
    );
}

export default Provider;
