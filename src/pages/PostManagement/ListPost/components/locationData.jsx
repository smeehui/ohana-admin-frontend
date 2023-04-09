import {provinceService} from "~/service";


let provinces = [];
let districts = [];

(async  ()=> {
    let provinceResults = await provinceService.getAllProvinces();
    provinces = [...provinceResults];
})();

export {provinces}

