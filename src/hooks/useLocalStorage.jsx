const OHANA = "ohana";
const useLocalStorage = () => {
    let json = localStorage.getItem(OHANA) || JSON.stringify({});
    let setItems = JSON.parse(json);
    const save = (key, value) => {
        setItems[key] = value;
        localStorage.setItem(OHANA, JSON.stringify(setItems));
    };
    const get = (key) => {
       return setItems[key]
    };

    const remove = (key)=> {
        delete setItems[key]
        localStorage.setItem(OHANA, JSON.stringify(setItems))
    }
    return { save, get,remove };
};
export default useLocalStorage;
