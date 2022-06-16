export const getEllipsisTxt = (str, n = 6) => {
    if (str) {
        return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
};

export const tokenValue = (value, decimals) =>
    decimals ? value / Math.pow(10, decimals) : value;