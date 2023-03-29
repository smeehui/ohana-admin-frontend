const dateTimeFormatter = () => {
    const formatter = (date) => (new Date(date)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
    const getCurrentTime = () => (new Date()).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
    return {
        formatter,
        getCurrentTime
    }
}

export default dateTimeFormatter;