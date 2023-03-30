import { useGridApiContext } from "@mui/x-data-grid";
import React from "react";

function UserGridToolbar() {
    let apiRef = useGridApiContext();
    console.log(123);
    console.log(apiRef);
    return <div>UserGridToolbar</div>;
}

export default UserGridToolbar;
