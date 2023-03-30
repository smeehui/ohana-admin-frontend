const DATATABLE_THUMBNAIL = "h_50,w_50"

const imageFormatter = () => {
    const setThumbnail = (url, fommater) => {
        const params = url.split("/");
        params[6] = fommater || DATATABLE_THUMBNAIL;
        return params.join("/");
    }
    return {
        setThumbnail
    }
}

export default imageFormatter;