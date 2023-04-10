;
const initState = {}

const actions = {

}


const reducer = (action,payload, args) => {
    actions[action.type](action,payload, args);
    return state;
};
export {initState}
export default reducer;
