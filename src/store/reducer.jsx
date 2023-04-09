import {GET_ALL_DISTRICTS_BY_PROVINCE_ID, GET_ALL_PROVINCES} from "~/store/actionConstants";
import {locationService} from "~/service";

const initState = {
    provinces: [],
    districts: []
};
locationService.getAllProvinces().then(provinces => initState.provinces = provinces);


const reducer = (state, action, args) => {
    switch (action) {
        case GET_ALL_PROVINCES:
            locationService.getAllProvinces().then((provinces) =>state.provinces = provinces);
            break;
        case GET_ALL_DISTRICTS_BY_PROVINCE_ID:
            locationService.getAllDistrictsByProvinceId(action.payload)
                .then(districts => state.districts = districts);
        default:
            console.log("Voo roi")
    }
    return state;
};

export { initState };
export default reducer;
