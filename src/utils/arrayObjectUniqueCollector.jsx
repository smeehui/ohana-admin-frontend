function arrayObjectUniqueCollector(arr1, arr2, field) {
    Array.prototype.isEmpty = function () {
        return this.length !== 0;
    };

    if (arr1.length > arr2.length) {
        const filter = arr1.filter(
            (row) => !arr2.some((row2) => row2.id === row.id),
        );
        return filter;
    }
    const filter = arr2.filter(
        (row) => !arr1.some((row2) => row2.id === row.id),
    );
    return filter;
}
export default arrayObjectUniqueCollector;
