function ASC(a, b) {
    return a > b;
}

function DESC(a, b) {
    return a < b;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}