import {GlobalActions} from "~/store/actionConstants";

;
const initState = {}

const actions = {
    [GlobalActions.CHANGE_COLOR]: (action) => {
        console.log(action)
        return {...action.payload}
    }
}


const reducer = (action, state, ...args) => {
    if (action.type) {
        return actions[action.type](action,state, args);
    }
    return initState;
};
export {initState}
export default reducer;
