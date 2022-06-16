export function reduceNum(
    num: number | string,
    howNums: number
): string {
    return parseFloat(`${num}`).toFixed(howNums);
}

export function reduceStr(
    str: string
): string {
    return str.substr(0, 4) + '...' + str.substr(-2, 2);
}