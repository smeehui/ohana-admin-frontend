import React, {useCallback, useContext, useEffect, useState} from "react";

function ManagePost(callback, deps) {
    const [data, setData] = useState([]);
    const [state, dispatch] = useContext(AppContext);
    const isMount = useIsMount();
    const handleFilter = useCallback((filter) => {
        console.log(filter)
    });
    const filter = {handleFilter}

    useEffect(() => {
        dispatch(CALLING_API);
        getAllPosts()
            .then((data) => {
                setData(data);
            })
            .finally(() => dispatch(API_CALLED));
    }, []);
    return (
        <h1>PostManagêmnt</h1>
    );
}

export default ManagePost;
