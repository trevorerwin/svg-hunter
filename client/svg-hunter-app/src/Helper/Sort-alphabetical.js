export function sortAlpha (data) {
    data.sort(function (a, b) {
    let x = a.svgName.toUpperCase().trim(),
        y = b.svgName.toUpperCase().trim();
    return x === y ? 0 : x > y ? 1 : -1;});
};

export function alphaSort (a, b) {
    let x = a.svgName.toUpperCase().trim(),
        y = b.svgName.toUpperCase().trim();
    return x === y ? 0 : x > y ? 1 : -1;};