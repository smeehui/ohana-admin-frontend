const RESTAURANT_KEY = "restaurant_key";
const useLocalStorage = () => {
    let json = localStorage.getItem(RESTAURANT_KEY) || JSON.stringify({});
    let setItems = JSON.parse(json);
    const save = (key, value) => {
        setItems[key] = value;
        localStorage.setItem(RESTAURANT_KEY, JSON.stringify(setItems));
    };
    const get = (key) => {
        return setItems[key];
    };
    return { save, get };
};
export default useLocalStorage;
