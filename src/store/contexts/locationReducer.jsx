import {CHANGE_DISTRICT, GET_ALL_DISTRICTS_BY_PROVINCE_ID, GET_ALL_PROVINCES} from "~/store/actionConstants";
import {locationService} from "~/service";

const initState = {
    provinces: [],
    districts: [],
    provinceId: 46,
    districtId: 474
};
locationService.getAllProvinces().then(provinces => initState.provinces = provinces);
locationService.getAllDistrictsByProvinceId(46).then(districts => initState.districts = districts);

const actions = {
    [GET_ALL_PROVINCES]:  (state)=>{
        locationService.getAllProvinces().then((provinces) =>state.provinces = provinces)
    },
    [ GET_ALL_DISTRICTS_BY_PROVINCE_ID]: ({pId})=>{
        locationService.getAllDistrictsByProvinceId(pId).then(districts => state.districts = districts);
        return state;
    },
    [CHANGE_DISTRICT]: (state,{payload})=>{
        state.districtId = payload;
        return state;
    }
}


const locationReducer = (action,state=initState, args) => {
    console.log(action)
    // actions[action.type]&& actions[action.type](state,action, ...args);
    return state;

};

export { initState };
export default locationReducer;
