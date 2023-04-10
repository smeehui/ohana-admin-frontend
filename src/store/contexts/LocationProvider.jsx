import { useReducer } from "react";
import locationReducer, {initState} from "~/store/contexts/locationReducer";
import {LocationContext} from "~/store/contexts/index";

function Provider({ children }) {
    const [state, dispatch] = useReducer(locationReducer, initState);
    return (
        <LocationContext.Provider value={[state, dispatch]}>
            {children}
        </LocationContext.Provider>
    );
}

export default Provider;
