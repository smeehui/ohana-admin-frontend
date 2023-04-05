import React from "react";
import {useParams} from "react-router-dom";

function PostDetails (){
    const {id} = useParams()
    return <h1>Post details + {id}</h1>
}
export default PostDetails;